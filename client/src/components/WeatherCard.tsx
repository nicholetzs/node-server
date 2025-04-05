import React from "react";
import { Droplets, Wind, MapPin } from "lucide-react";

interface WeatherCardProps {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
  location?: string;
  weather_icon?: string;
  humidity?: number;
  wind_speed?: number;
  rain?: boolean;
}

export default function WeatherCard({
  day,
  date,
  tempMin,
  tempMax,
  condition,
  icon,
  location,
  weather_icon,
  humidity,
  wind_speed,
  rain,
}: WeatherCardProps) {
  // Função para determinar a cor do gradiente baseada na temperatura máxima
  const getMaxTempGradient = (temp: number) => {
    if (temp >= 30) return "from-red-500 via-orange-400 to-yellow-400";
    if (temp >= 25) return "from-orange-400 via-yellow-400 to-yellow-300";
    if (temp >= 20) return "from-yellow-400 via-yellow-300 to-green-300";
    if (temp >= 15) return "from-green-400 via-green-300 to-blue-300";
    return "from-blue-400 via-blue-300 to-indigo-400";
  };

  // Função para determinar a cor do gradiente baseada na temperatura mínima
  const getMinTempGradient = (temp: number) => {
    if (temp >= 25) return "from-orange-300 to-yellow-300";
    if (temp >= 20) return "from-yellow-300 to-green-300";
    if (temp >= 15) return "from-green-300 to-blue-300";
    if (temp >= 10) return "from-blue-300 to-indigo-300";
    return "from-indigo-300 to-purple-300";
  };

  // Função para determinar a cor do gradiente baseada na umidade
  const getHumidityGradient = (humidity: number = 50) => {
    if (humidity >= 80) return "from-blue-600 to-blue-400";
    if (humidity >= 60) return "from-blue-500 to-blue-300";
    if (humidity >= 40) return "from-blue-400 to-blue-200";
    if (humidity >= 20) return "from-blue-300 to-indigo-200";
    return "from-indigo-300 to-purple-200";
  };

  // Função para determinar a cor do gradiente baseada na velocidade do vento
  const getWindGradient = (speed: number = 10) => {
    if (speed >= 30) return "from-purple-600 to-indigo-400";
    if (speed >= 20) return "from-indigo-500 to-blue-400";
    if (speed >= 10) return "from-blue-500 to-cyan-400";
    if (speed >= 5) return "from-cyan-400 to-teal-300";
    return "from-teal-400 to-green-300";
  };

  // Determina se deve mostrar a seção expandida
  const showExpandedSection =
    location ||
    humidity !== undefined ||
    wind_speed !== undefined ||
    rain !== undefined;

  return (
    <div className="group relative perspective-1000">
      {/* Estrelas de fundo que aparecem no hover */}
      <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/2 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Card principal com fundo mais claro mas mantendo os efeitos cósmicos */}
      <div className="relative bg-gradient-to-br from-white/90 via-blue-50/80 to-purple-50/90 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center transform transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] border border-white/60 overflow-hidden preserve-3d group-hover:rotate-y-5 group-hover:rotate-x-5 z-10">
        {/* Efeito de brilho orbital */}
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-purple-300/20 to-transparent rotate-45 transform translate-x-full group-hover:translate-x-[-250%] transition-transform duration-1500 ease-in-out"></div>

        {/* Planeta decorativo no canto */}
        <div className="absolute -top-6 -right-6 w-12 h-12 opacity-30 group-hover:opacity-70 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 animate-pulse-slow"></div>
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-300 to-purple-600 opacity-80"></div>
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white/30 blur-sm"></div>
        </div>

        {/* Localização (se fornecida) com efeito de portal espacial */}
        {location && (
          <div className="absolute -top-1 -left-1 transform -translate-x-1/4 -translate-y-1/4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/40 to-indigo-600/40 blur-md animate-pulse-slow"></div>
              <div className="relative flex items-center justify-center p-1 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-sm rounded-full border border-white/20 shadow-inner">
                <MapPin size={12} className="text-indigo-200 mr-1" />
                <span className="text-[10px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                  {location}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Indicador de chuva (se rain=true) */}
        {rain && (
          <div className="absolute -top-1 -right-1 w-6 h-6 transform translate-x-1/4 -translate-y-1/4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 blur-md animate-pulse-slow"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 backdrop-blur-sm border border-white/20"></div>
              <div className="relative">
                {/* Animação de gotas de chuva */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-1.5 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full animate-rain-indicator"
                    style={{
                      left: `${i * 2 - 2}px`,
                      top: "-4px",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dia e data com texto mais escuro para melhor contraste */}
        <div className="w-full text-center mb-3 pb-2 border-b border-purple-200/30 relative">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 font-bold">
            {day}, {date}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        </div>

        {/* Ícones do clima com efeitos cósmicos */}
        <div className="my-3 relative w-16 h-16 flex items-center justify-center animate-float">
          {/* Usar weather_icon personalizado se fornecido */}
          {weather_icon ? (
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={weather_icon || "/placeholder.svg"}
                alt={condition}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]"
              />
              {/* Partículas de brilho ao redor do ícone personalizado */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-300/70 rounded-full animate-float-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Ícones padrão baseados no tipo */}
              {icon === "partly-sunny" && (
                <>
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full absolute top-1 left-1 shadow-[0_0_15px_rgba(252,211,77,0.7)] animate-pulse-slow"></div>
                  <div className="w-10 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full absolute bottom-1 right-0 shadow-sm backdrop-blur-sm"></div>
                </>
              )}

              {icon === "sunny" && (
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_20px_rgba(252,211,77,0.8)] animate-pulse-slow">
                  {/* Raios solares */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-yellow-300 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) rotate(${
                          i * 45
                        }deg) translateY(-8px)`,
                      }}
                    ></div>
                  ))}
                </div>
              )}

              {/* ÍCONE: Chuva Leve (Light Rain) */}
              {icon === "light-rain" && (
                <>
                  <div className="w-10 h-5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full absolute top-1 shadow-inner"></div>
                  {/* Poucas gotas de chuva finas e lentas */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-1.5 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full animate-light-rain"
                      style={{
                        left: `${5 + i * 6}px`,
                        top: "10px",
                        animationDelay: `${i * 0.8}s`,
                      }}
                    ></div>
                  ))}
                </>
              )}

              {/* ÍCONE: Chuva Moderada (Moderate Rain) */}
              {(icon === "moderate-rain" || icon === "rain") && (
                <>
                  <div className="w-10 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute top-1 shadow-inner"></div>
                  {/* Quantidade média de gotas de chuva */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.75 h-2 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full animate-rain"
                      style={{
                        left: `${3 + i * 4}px`,
                        top: "10px",
                        animationDelay: `${i * 0.3}s`,
                      }}
                    ></div>
                  ))}
                </>
              )}

              {/* ÍCONE: Chuva Forte (Heavy Rain) */}
              {icon === "heavy-rain" && (
                <>
                  <div className="w-10 h-5 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full absolute top-1 shadow-inner"></div>
                  {/* Muitas gotas de chuva, mais grossas e rápidas */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-2.5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-heavy-rain"
                      style={{
                        left: `${2 + i * 3}px`,
                        top: "10px",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    ></div>
                  ))}
                  {/* Segunda camada de gotas para intensidade extra */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i + 8}
                      className="absolute w-1 h-2.5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-heavy-rain"
                      style={{
                        left: `${3 + i * 3}px`,
                        top: "8px",
                        animationDelay: `${i * 0.15 + 0.5}s`,
                      }}
                    ></div>
                  ))}
                </>
              )}

              {/* Ícone Nublado (Cloudy) */}
              {icon === "cloudy" && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Camada de nuvens com efeito de movimento */}
                  <div className="absolute w-12 h-5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full top-2 left-1/2 transform -translate-x-1/2 shadow-[0_0_10px_rgba(220,220,220,0.5)] animate-float-slow"></div>

                  <div className="absolute w-10 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full top-5 left-1/2 transform -translate-x-1/2 translate-x-2 shadow-[0_0_8px_rgba(200,200,200,0.5)] animate-float-slow-reverse"></div>

                  <div
                    className="absolute w-11 h-5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full top-7 left-1/2 transform -translate-x-1/2 -translate-x-1 shadow-[0_0_10px_rgba(220,220,220,0.5)] animate-float-slow"
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Partículas de névoa */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-mist"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Partículas flutuantes */}
          <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-blue-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float-particle"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-purple-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float-particle"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Temperaturas com gradientes cósmicos */}
        <div className="w-full space-y-2">
          {/* Temperatura máxima */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">Máx:</span>
            <div className="flex items-start">
              <div
                className={`text-transparent bg-clip-text bg-gradient-to-r ${getMaxTempGradient(
                  tempMax
                )} font-bold text-lg`}
              >
                {Math.round(tempMax)}°C
              </div>
            </div>
          </div>

          {/* Temperatura mínima */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">Mín:</span>
            <div className="flex items-start">
              <div
                className={`text-transparent bg-clip-text bg-gradient-to-r ${getMinTempGradient(
                  tempMin
                )} font-medium text-sm`}
              >
                {Math.round(tempMin)}°C
              </div>
            </div>
          </div>
        </div>

        {/* Seção expandida com umidade e velocidade do vento */}
        {showExpandedSection && (
          <div className="w-full mt-3 pt-3 border-t border-purple-200/30 space-y-2 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>

            {/* Umidade */}
            {humidity !== undefined && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets size={12} className="text-blue-400 mr-1" />
                  <span className="text-xs font-medium text-gray-600">
                    Umidade:
                  </span>
                </div>
                <div className="flex items-center">
                  {/* Barra de progresso cósmica para umidade */}
                  <div className="relative w-12 h-2 bg-gray-200/50 rounded-full overflow-hidden mr-1">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getHumidityGradient(
                        humidity
                      )}`}
                      style={{ width: `${humidity}%` }}
                    >
                      {/* Partículas de brilho na barra */}
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse"
                          style={{
                            left: `${(i + 1) * 25}%`,
                            top: "50%",
                            transform: "translateY(-50%)",
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
                    {humidity}%
                  </span>
                </div>
              </div>
            )}

            {/* Velocidade do vento */}
            {wind_speed !== undefined && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wind size={12} className="text-indigo-400 mr-1" />
                  <span className="text-xs font-medium text-gray-600">
                    Vento:
                  </span>
                </div>
                <div className="flex items-center">
                  {/* Indicador de vento com animação */}
                  <div className="relative w-12 h-2 mr-1 flex items-center">
                    {[...Array(Math.min(5, Math.ceil(wind_speed / 5)))].map(
                      (_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-1.5 rounded-sm mx-0.5 bg-gradient-to-t ${getWindGradient(
                            wind_speed
                          )} animate-wind-indicator`}
                          style={{
                            height: `${Math.min(100, (i + 1) * 20)}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      )
                    )}
                  </div>
                  <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">
                    {wind_speed} km/h
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Condição do clima */}
        <div className="mt-3 pt-2 border-t border-purple-200/30 w-full relative">
          <p className="text-xs text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-medium">
            {condition}
          </p>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        </div>
      </div>

      {/* Reflexo sob o card */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4/5 h-6 bg-purple-500/10 rounded-full blur-md scale-x-75 z-0"></div>
    </div>
  );
}
