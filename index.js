import { connectDB } from "./db.js";
import express from "express";
import { getWeatherData } from "./weather.js"; // Importe a função do arquivo 'weather.js'

const port = process.env.PORT; // Render define a porta automaticamente

async function startServer() {
  const db = await connectDB(); // Conecta ao MongoDB antes de iniciar o servidor

  if (!db) {
    console.error(
      "Erro ao conectar ao MongoDB. O servidor não pode ser iniciado."
    );
    return;
  }
  const app = express();

  // Rota para mostrar a resposta da API
  app.get("/weather", async (req, res) => {
    try {
      const weatherData = await getWeatherData(); // Chama a função para obter os dados
      res.json(weatherData); // Retorna os dados da API para o cliente
      console.log(weatherData, "Dados da API"); // Log dos dados recebidos
    } catch (error) {
      res.status(500).send("Erro ao obter dados meteorológicos");
    }
  });

  app.get("/", async (req, res) => {
    res.status(200).send("Servidor está rodando e conectado ao MongoDB!");
  });

  app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}/`);
  });
}

startServer();
