import { connectDB } from "./db.js";
import { getWeatherData } from "./weather.js";

export async function saveWeatherData() {
  try {
    const data = await getWeatherData(); // Obtém os dados da API

    const db = await connectDB();
    const collection = db.collection("weather"); // Define a coleção

    const weatherData = data.list.map((forecast) => ({
      timestamp: new Date(forecast.dt * 1000),
      temperature: forecast.main.temp,
      humidity: forecast.main.humidity,
      weather: forecast.weather[0].description,
      wind_speed: forecast.wind.speed,
      rain: forecast.rain ? true : false,
      location: "Vitória",
    }));

    await collection.insertMany(weatherData);
    console.log("✅ Dados meteorológicos salvos no MongoDB!");
  } catch (error) {
    console.error("Erro ao salvar os dados no banco de dados:", error);
  }
}
