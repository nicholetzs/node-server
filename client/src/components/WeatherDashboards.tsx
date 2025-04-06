import { useEffect, useState } from "react";
import { Search, User, Home, Map, Lock, Star } from "lucide-react";
import WeatherCard from "./WeatherCard";
import TemperatureChart from "./TemperatureChart";
import AtualizarPrevisoes from "./AtualizarPrevisoes";

interface Previsao {
  timestamp: string;
  temperature: number;
  temperature_min: number;
  temperature_max: number;
  humidity: number;
  weather: string;
  wind_speed: number;
  rain: boolean;
  location: string;
  weather_icon?: string;
}

export default function WeatherDashboard() {
  const [activeTab, setActiveTab] = useState("daily");
  const [previsoes, setPrevisoes] = useState<Previsao[]>([]);
  const [loading, setLoading] = useState(false);

  const atualizarPrevisoes = async () => {
    try {
      await fetch("https://whitenights.onrender.com/weatherSave", {
        method: "POST",
      });
      console.log("Dados atualizados com sucesso");
    } catch (erro) {
      console.error("Erro ao atualizar previsões:", erro);
    }
  };

  const buscarPrevisoes = async () => {
    setLoading(true);
    try {
      const resposta = await fetch(
        "https://whitenights.onrender.com/weatherList"
      );
      const dados = await resposta.json();
      setPrevisoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar previsões:", erro);
    } finally {
      setLoading(false);
    }
  };

  // Agrupa as previsões por data e formata os dados
  // Exemplo de agrupamento:
  /* "04/04/2025": [ previsao1, previsao2, ..., previsao7 ],
   "05/04/2025": [ previsao1, ..., previsao8 ]
}*/

  const previsoesAgrupadas = previsoes.reduce(
    (acc: Record<string, Previsao[]>, curr) => {
      const data = new Date(curr.timestamp).toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      if (!acc[data]) acc[data] = [];
      acc[data].push(curr);

      return acc;
    },
    {}
  );

  const previsoesAgrupadasPorDia = Object.entries(previsoesAgrupadas)
    .map(([dataPtBr, previsoesDoDia]) => {
      const primeira = previsoesDoDia[0];

      const temperaturas = previsoesDoDia.map((p) => Number(p.temperature));
      const tempMin = Math.min(...temperaturas);
      const tempMax = Math.max(...temperaturas);

      const umidades = previsoesDoDia.map((p) => Number(p.humidity));
      const mediaUmidade =
        umidades.reduce((a, b) => a + b, 0) / umidades.length;

      const ventos = previsoesDoDia.map((p) => Number(p.wind_speed));
      const mediaVento = ventos.reduce((a, b) => a + b, 0) / ventos.length;

      // Usando o timestamp da primeira previsão para criar a data ordenável
      const dateObj = new Date(primeira.timestamp);

      return {
        date: dateObj,
        weekday: dateObj.toLocaleDateString("pt-BR", {
          weekday: "short",
          timeZone: "America/Sao_Paulo",
        }),
        temperature_min: tempMin,
        temperature_max: tempMax,
        average_humidity: Number(mediaUmidade.toFixed(1)),
        average_wind_speed: Number(mediaVento.toFixed(1)),
        condition: primeira.weather,
        icon: primeira.weather_icon,
        location: primeira.location,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const getIconFromCondition = (condition: string): string => {
    const normalizedCondition = condition
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const conditionMap: Record<string, string> = {
      // Céu limpo
      "ceu limpo": "sunny",

      // Nuvens
      "algumas nuvens": "partly-sunny",
      "nuvens dispersas": "partly-sunny",
      nublado: "cloudy",

      // Condições de chuva com diferentes intensidades
      "chuva leve": "light-rain",
      garoa: "light-rain",
      chuvisco: "light-rain",
      "light rain": "light-rain",
      drizzle: "light-rain",

      "chuva moderada": "moderate-rain",
      chuva: "moderate-rain",
      rain: "moderate-rain",
      "moderate rain": "moderate-rain",

      "chuva forte": "heavy-rain",
      temporal: "heavy-rain",
      "heavy rain": "heavy-rain",
      downpour: "heavy-rain",
    };

    for (const key in conditionMap) {
      if (normalizedCondition.includes(key)) {
        return conditionMap[key];
      }
    }

    return "partly-sunny";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-300 to-blue-200 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white/80 p-6 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-10">Forecast</h2>

          <nav className="space-y-6 flex-1">
            <button
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-blue-50 transition-colors"
              onClick={() => setActiveTab("home")}
            >
              <Home size={18} />
              <span>Home</span>
            </button>

            <button
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
                activeTab === "daily"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("daily")}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current rounded-sm flex items-center justify-center">
                  <div
                    className={`w-2 h-2 ${
                      activeTab === "daily" ? "bg-blue-600" : "bg-transparent"
                    } rounded-sm`}
                  ></div>
                </div>
              </div>
              <span>Daily</span>
            </button>

            <button
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-blue-50 transition-colors"
              onClick={() => setActiveTab("maps")}
            >
              <Map size={18} />
              <span>Maps</span>
            </button>
          </nav>

          {/* Upgrade Card */}
          <div className="mt-auto pt-6">
            <div className="bg-blue-50 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                    <Lock className="text-white" size={18} />
                  </div>
                  <Star
                    className="text-yellow-400 absolute -top-1 -right-1"
                    size={14}
                  />
                  <Star
                    className="text-yellow-400 absolute top-2 -right-3"
                    size={10}
                  />
                </div>
              </div>
              <div className="pt-14 pb-2">
                <p className="text-sm font-medium text-gray-700">
                  Upgrade to <span className="font-bold">PRO</span> for more
                  features
                </p>

                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header with Search and Profile */}
          <div className="flex justify-end items-center mb-8">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search here..."
                className="bg-white/80 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 md:w-64"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
            <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </button>
          </div>

          {/* Current Weather */}
          {previsoes.length > 0 && (
            <div className="text-center mb-8">
              {/* Local e horário */}
              <h2 className="text-xl text-gray-800 mb-1">
                {previsoes[0].location}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {previsoes[0].timestamp}
              </p>

              {/* Temperatura central com solzinho e nuvem */}
              <div className="flex justify-center items-center mb-2">
                <div className="relative">
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full absolute top-1 left-1 shadow-md"></div>
                      <div className="w-12 h-6 bg-white rounded-full absolute bottom-1 right-0 shadow"></div>
                    </div>
                  </div>
                  <span className="text-7xl font-light text-blue-600">
                    {Math.round(previsoes[0].temperature)}°C
                  </span>
                  <span className="text-xl align-top text-blue-600">°C</span>
                </div>
              </div>

              {/* Descrição do clima */}
              <p className="text-gray-600 capitalize">{previsoes[0].weather}</p>

              {/* Informações adicionais */}
              <div className="flex justify-center gap-8 mt-4 text-sm text-gray-600">
                <div className="text-center">
                  <p>Min: {Math.round(previsoes[0].temperature_min)}°C</p>
                  <p>Max: {Math.round(previsoes[0].temperature_max)}°C</p>
                  <p>Sensação: {Math.round(previsoes[0].temperature)}°C</p>
                </div>
                <div className="text-center">
                  <p>Vento: {Math.round(previsoes[0].wind_speed)} km/h</p>
                  <p>Umidade: {previsoes[0].humidity}%</p>
                  <p>Chuva: {previsoes[0].rain ? "Sim" : "Não"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Daily Section Title */}
          <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-800">Daily</h3>
            <AtualizarPrevisoes
              onAtualizar={buscarPrevisoes}
              loading={loading}
            />

            <div>
              <button
                className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
                onClick={atualizarPrevisoes}
              >
                teste chamar api e salvar no banco de dados
              </button>
            </div>
          </div>

          {/* Daily Weather Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
            {previsoesAgrupadasPorDia.map((dia, index) => (
              <WeatherCard
                key={index}
                date={dia.date.toLocaleDateString("pt-BR")}
                tempMin={dia.temperature_min}
                tempMax={dia.temperature_max}
                condition={dia.condition}
                location={dia.location}
                icon={getIconFromCondition(dia.condition)}
                humidity={dia.average_humidity}
                wind_speed={dia.average_wind_speed}
                day={dia.weekday}
              />
            ))}
            {/**    {previsoesAgrupadasPorDia.map((dia, index) => (
              <WeatherCard
                key={index}
                date={dia.date.toLocaleDateString("pt-BR")}
                tempMin={dia.temperature_min}
                tempMax={dia.temperature_max}
                condition={dia.condition}
                location={dia.location}
                icon={getIconFromCondition(dia.condition)}
                humidity={dia.average_humidity}
                wind_speed={dia.average_wind_speed}
                //rain={"0"} // pode ajustar se quiser a média de chuva também
                day={dia.weekday}
              />
            ))} */}
            {/* {previsoes.map((dia, index) => (
              <WeatherCard
                key={index}
                date={dia.timestamp}
                tempMin={dia.temperature_min}
                tempMax={dia.temperature_max}
                condition={dia.weather}
                location={dia.location}
                icon={getIconFromCondition(dia.weather)} // ✅ passa o valor certo na prop correta
                humidity={dia.humidity}
                wind_speed={dia.wind_speed}
                rain={dia.rain}
                day={""}
              />
            ))}*/}
          </div>
          {/* Hourly Section */}
          <h3 className="text-xl font-medium text-gray-800 mb-4">Hourly</h3>
          {/* Temperature Chart */}
          <div className="h-48">
            <TemperatureChart />
          </div>
        </div>
      </div>
    </div>
  );
}
