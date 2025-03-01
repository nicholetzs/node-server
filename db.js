// db.js - Configuração da conexão com o MongoDB

const { MongoClient, ServerApiVersion } = require("mongodb");

import { config } from "dotenv";
config();

const uri = process.env.MONGO_URI; // Usa a variável de ambiente no lugar da string fixa

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("🔥 Conectado ao MongoDB!");
    return client.db("meuBanco"); // Substitua "meuBanco" pelo nome do seu banco de dados
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  }
}

module.exports = { connectDB, client };
