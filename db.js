// db.js - Configuração da conexão com o MongoDB
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("🔥 Conectado ao MongoDB!");
    return client.db("meuBanco"); // Substitua "meuBanco" pelo nome do seu banco de dados
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

export { client };
