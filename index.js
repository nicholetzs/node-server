import { createServer } from "node:http";

//Código antigo para criar um servidor
/*const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

//Código novo para criar um servidor para o Render acessar a aplicação (abrindo portas pra fora) sem segurança reforçada
import http from "http";
import { connectDB } from "./db.js";

const port = process.env.PORT; // Render define a porta automaticamente

async function startServer() {
  const db = await connectDB(); // Conecta ao MongoDB antes de iniciar o servidor
  const express = require("express");
  const app = express();

  if (!db) {
    console.error(
      "Erro ao conectar ao MongoDB. O servidor não pode ser iniciado."
    );
    return;
  }

  const server = app.get(async (req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Servidor está rodando e conectado ao MongoDB!");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Página não encontrada.");
    }
  });

  server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}/`);
  });
}

startServer();
