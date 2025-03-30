// weather.js
export async function getWeatherData() {
  const weatherApiKey = process.env.WEATHER_API_KEY;
  const lat = -20.3155; // Latitude de Vitória
  const lon = -40.3128; // Longitude de Vitória

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${weatherApiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Erro na requisição para a API");
    }

    const data = await response.json(); // Converte a resposta para JSON
    console.log(data, "Dados da API"); // Log dos dados recebidos

    return data; // Retorna os dados da API
  } catch (error) {
    console.error("Erro ao obter dados meteorológicos:", error);
    throw error; // Lança o erro para ser tratado no controller
  }
}
