import { connectDB } from "./db.js";
import { getWeatherData } from "./weather.js";

export async function saveWeatherData() {
  try {
    const data = await getWeatherData(); // Obtém os dados da API

    const db = await connectDB();
    const collection = db.collection("collection-weather"); // Define a coleção

    const weatherData = data.list.map((forecast) => ({
      timestamp: new Date(forecast.dt * 1000).toLocaleDateString("pt-BR"),
      timestamp_hour: new Date(forecast.dt * 1000).toLocaleTimeString("pt-BR"),
      temperature: forecast.main.temp,
      humidity: forecast.main.humidity,
      weather: forecast.weather[0].description,
      weather_icon: forecast.weather[0].icon,
      wind_speed: forecast.wind.speed,
      rain: forecast.rain ? true : false,
      location: "Vitória",
    }));

    const result = await collection.insertMany(weatherData);
    console.log("✅ Dados meteorológicos salvos no MongoDB!");

    return result; // Retorna os dados inseridos
  } catch (error) {
    console.error("Erro ao salvar os dados no banco de dados:", error);
  }
}
