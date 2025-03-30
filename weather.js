// Description: Este arquivo contém a função getWeatherData que faz uma requisição à API OpenWeatherMap para obter dados meteorológicos de Vitória, Brasil. A função utiliza a chave da API armazenada em uma variável de ambiente e retorna os dados recebidos em formato JSON. Caso ocorra um erro durante a requisição, ele é tratado e registrado no console.
// Importa o dotenv para carregar variáveis de ambiente
import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// weather.js
export async function getWeatherData() {
  const weatherApiKey = process.env.WEATHER_API_KEY;
  const lat = -20.3155; // Latitude de Vitória
  const lon = -40.3128; // Longitude de Vitória
  console.log("Chave da API:", process.env.WEATHER_API_KEY);
  console.log("Latitude:", lat);
  console.log("Longitude:", lon);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=pt_br`
    );
    console.log(response, "Resposta da API"); // Log da resposta da API

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
