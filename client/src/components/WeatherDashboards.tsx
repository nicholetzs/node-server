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

  const previsoesAgrupadas: { [key: string]: Previsao[] } = previsoes.reduce(
    (acc: any, curr: Previsao) => {
      const [datePart] = curr.timestamp.split(" ");
      if (!acc[datePart]) {
        acc[datePart] = [];
      }
      acc[datePart].push(curr);
      return acc;
    },
    {}
  );

  const diasAgrupados = Object.entries(previsoesAgrupadas)
    .map(([data, previsoesDoDia]) => {
      const [day, month, year] = data.split("/");
      const isoDate = new Date(`${year}-${month}-${day}`);

      const temperaturas = previsoesDoDia.map((p) => Number(p.temperature));
      const tempMin = Math.min(...temperaturas);
      const tempMax = Math.max(...temperaturas);

      const primeira = previsoesDoDia[0];

      return {
        date: isoDate,
        day: isoDate.toLocaleDateString("pt-BR", { weekday: "short" }),
        tempMin,
        tempMax,
        condition: primeira.weather,
        icon: primeira.weather_icon,
        location: primeira.location,
        timestamp: primeira.timestamp,
        temperature: primeira.temperature,
        humidity: primeira.humidity,
        wind_speed: primeira.wind_speed,
        rain: primeira.rain,
        weather: primeira.weather,
        weather_icon: primeira.weather_icon,
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

      // Chuvas
      "chuva leve": "rain",
      "chuva moderada": "rain",
      "chuva forte": "rain",
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
          {diasAgrupados.length > 0 && (
            <div className="text-center mb-8">
              {/* Local e horário */}
              <h2 className="text-xl text-gray-800 mb-1">
                {diasAgrupados[0].location}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(diasAgrupados[0].timestamp).toLocaleString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
                    {Math.round(diasAgrupados[0].temperature)}°C
                  </span>
                  <span className="text-xl align-top text-blue-600">°C</span>
                </div>
              </div>

              {/* Descrição do clima */}
              <p className="text-gray-600 capitalize">
                {diasAgrupados[0].weather}
              </p>

              {/* Informações adicionais */}
              <div className="flex justify-center gap-8 mt-4 text-sm text-gray-600">
                <div className="text-center">
                  <p>Min: {Math.round(diasAgrupados[0].tempMin)}°C</p>
                  <p>Max: {Math.round(diasAgrupados[0].tempMax)}°C</p>
                  <p>Sensação: {Math.round(previsoes[0].temperature)}°C</p>
                </div>
                <div className="text-center">
                  <p>Vento: {Math.round(previsoes[0].wind_speed)} km/h</p>
                  <p>Umidade: {diasAgrupados[0].humidity}%</p>
                  <p>Chuva: {diasAgrupados[0].rain ? "Sim" : "Não"}</p>
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
          </div>

          {/* Daily Weather Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 relative z-10">
            {diasAgrupados.map((dia, index) => (
              <WeatherCard
                key={index}
                day={dia.day}
                date={dia.date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
                tempMin={dia.tempMin}
                tempMax={dia.tempMax}
                condition={dia.condition}
                icon={getIconFromCondition(dia.condition)}
              />
            ))}
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
