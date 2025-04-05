import React from "react"; // mesmo que você não use diretamente

interface WeatherCardProps {
  day: string;
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

export default function WeatherCard({
  day,
  date,
  temp,
  condition,
  icon,
}: WeatherCardProps) {
  return (
    <>
      <div className="bg-white/80 rounded-xl p-4 flex flex-col items-center">
        <p className="text-gray-700 font-medium">
          {day} {date}
        </p>

        <div className="my-3 relative w-12 h-12 flex items-center justify-center">
          {icon === "partly-sunny" && (
            <>
              <div className="w-6 h-6 bg-yellow-400 rounded-full absolute top-1 left-1"></div>
              <div className="w-8 h-4 bg-white rounded-full absolute bottom-1 right-0 shadow-sm"></div>
            </>
          )}

          {icon === "sunny" && (
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
          )}

          {icon === "rain" && (
            <>
              <div className="w-8 h-4 bg-gray-300 rounded-full absolute top-1"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute bottom-2 left-2"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute bottom-1 left-4"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full absolute bottom-3 left-6"></div>
            </>
          )}
        </div>

        <div className="text-center">
          <div className="flex items-start">
            <span className="text-2xl font-light text-blue-600">{temp}</span>
            <span className="text-xs text-blue-600">°</span>
          </div>
          <p className="text-xs text-gray-600">{condition}</p>
        </div>
      </div>
    </>
  );
}
