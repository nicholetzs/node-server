interface WeatherCardProps {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
  location?: string; // Adicionando a propriedade location
  weather_icon?: string; // Adicionando a propriedade weather_icon
  humidity?: number; // Adicionando a propriedade humidity
  wind_speed?: number; // Adicionando a propriedade wind
  rain?: boolean; // Adicionando a propriedade rain
}

export default function WeatherCard({
  day,
  date,
  tempMin,
  tempMax,
  condition,
  icon,
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

        {/* Dia e data com texto mais escuro para melhor contraste */}
        <div className="w-full text-center mb-3 pb-2 border-b border-purple-200/30 relative">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 font-bold">
            {day}, {date}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        </div>

        {/* Ícones do clima com efeitos cósmicos */}
        <div className="my-3 relative w-16 h-16 flex items-center justify-center animate-float">
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

          {icon === "rain" && (
            <>
              <div className="w-10 h-5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full absolute top-1 shadow-inner"></div>
              {/* Gotas de chuva animadas */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full animate-rain"
                  style={{
                    left: `${3 + i * 4}px`,
                    top: "10px",
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></div>
              ))}
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
