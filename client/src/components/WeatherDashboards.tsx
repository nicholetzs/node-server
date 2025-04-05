import { useEffect, useState } from "react";
import { Search, User, Home, Map, Lock, Star } from "lucide-react";
import WeatherCard from "./WeatherCard";
import TemperatureChart from "./TemperatureChart";
import AtualizarPrevisoes from "./AtualizarPrevisoes";

export default function WeatherDashboard() {
  const [activeTab, setActiveTab] = useState("daily");

  const [previsoes, setPrevisoes] = useState([]);

  const buscarPrevisoes = async () => {
    try {
      // Primeiro, força a atualização chamando o POST
      await fetch("https://whitenights.onrender.com/weatherSave", {
        method: "POST",
      });

      // Depois, faz o GET como já fazia antes
      const resposta = await fetch(
        "https://whitenights.onrender.com/weatherList"
      );
      const dados = await resposta.json();
      setPrevisoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar previsões:", erro);
    }
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
          <div className="text-center mb-8">
            <h2 className="text-xl text-gray-800 mb-2">Tirana, Albania</h2>
            <div className="flex justify-center items-center mb-2">
              <div className="relative">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full absolute top-1 left-1"></div>
                    <div className="w-12 h-6 bg-white rounded-full absolute bottom-1 right-0"></div>
                  </div>
                </div>
                <span className="text-7xl font-light text-blue-600">20</span>
                <span className="text-xl align-top text-blue-600">°C</span>
              </div>
            </div>
            <p className="text-gray-600">Partly Sunny</p>

            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Feels Like 20</p>
                <p className="text-sm text-gray-600">Visibility 15 km</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Wind 11 km/h</p>
                <p className="text-sm text-gray-600">Humidity 67%</p>
              </div>
            </div>
          </div>

          {/* Daily Section Title */}
          <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-800">Daily</h3>
            <AtualizarPrevisoes onAtualizar={buscarPrevisoes} />
          </div>

          {/* Daily Weather Cards */}
          {/* Weather Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {previsoes.map((previsao: any, index: number) => (
              <WeatherCard
                key={index}
                day={new Date(previsao.data).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
                date={new Date(previsao.data).getDate().toString()}
                temp={previsao.temperatura}
                condition={previsao.condicao}
                icon="partly-sunny" // opcional: você pode ajustar isso baseado na `condicao`
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
