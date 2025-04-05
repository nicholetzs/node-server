import { connectDB } from "./db.js";
import express from "express";
import { getWeatherData } from "./weather.js";
import dotenv from "dotenv";
import { saveWeatherData } from "./weatherService.js";
import cors from "cors";
import { weatherLimiter } from "./weatherLimit.js"; // Importa o limitador de requisições

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const port = process.env.PORT; // Render define a porta automaticamente

async function startServer() {
  const db = await connectDB(); // Conecta ao MongoDB antes de iniciar o servidor
  const app = express(); // <-- precisa estar AQUI antes de usar `app`

  const allowedOrigins = [
    "http://localhost:3000", // para desenvolvimento local
    "https://whitenights.onrender.com", // substitua pela URL real do seu frontend no Render
  ];

  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  if (!db) {
    console.error(
      "Erro ao conectar ao MongoDB. O servidor não pode ser iniciado."
    );
    return;
  }

  // Rota para mostrar a resposta da API (teste)
  app.get("/weather", async (req, res) => {
    try {
      const weatherData = await getWeatherData(); // Chama a função para obter os dados
      res.json(weatherData); // Retorna os dados da API para o cliente
      console.log(weatherData, "Dados da API"); // Log dos dados recebidos
    } catch (error) {
      res.status(500).send("Erro ao obter dados meteorológicos");
    }
  });

  // Rota para salvar os dados no MongoDB pegando da API
  app.post("/weatherSave", async (req, res) => {
    try {
      const insertedResult = await saveWeatherData(); // Salva os dados no MongoDB

      if (insertedResult && insertedResult.insertedCount > 0) {
        res.status(201).json({
          message: "✅ Dados meteorológicos salvos com sucesso!",
          insertedCount: insertedResult.insertedCount,
        });
      } else {
        res.status(500).json({
          message:
            "⚠ Nenhum dado foi salvo. Verifique a API ou a conexão com o banco.",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar dados meteorológicos:", error);
      res.status(500).json({ error: "Erro ao salvar dados meteorológicos." });
    }
  });

  app.get("/weatherList", weatherLimiter, async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection("collection-weather");

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); // Zera a hora

      const dados = await collection
        .find({ timestamp: { $gte: hoje } })
        .sort({ timestamp: 1 })
        .toArray();

      res.status(200).json(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do banco:", error);
      res.status(500).json({ error: "Erro ao buscar dados salvos." });
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
