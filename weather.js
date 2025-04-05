import dotenv from "dotenv";
dotenv.config();

export async function getWeatherData() {
  const weatherApiKey = process.env.WEATHER_API_KEY;
  const lat = -20.3155; // Latitude de Vitória
  const lon = -40.3128; // Longitude de Vitória

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=pt_br` // Essa API fornece previsões de 5 dias com dados a cada 3 horas.
    );

    if (!response.ok) {
      throw new Error("Erro na requisição para a API");
    }

    const data = await response.json();
    console.log(data, "Dados da API");

    return data; // Apenas retorna os dados, sem salvar no banco
  } catch (error) {
    console.error("Erro ao obter dados meteorológicos:", error);
    throw error;
  }
}
