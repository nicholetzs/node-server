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

//Código novo para criar um servidor para o Render acessar a aplicação (abrindo portas)
import http from "http";
const { connectDB } = require("./db");

const hostname = "0.0.0.0"; // Permite acesso externo no Render
const port = process.env.PORT || 3000; // Render define a porta automaticamente

async function startServer() {
  const db = await connectDB(); // Conecta ao MongoDB antes de iniciar o servidor

  const server = http.createServer(async (req, res) => {
    if (req.url === "/ping") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Servidor está rodando e conectado ao MongoDB!");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Página não encontrada.");
    }
  });

  server.listen(port, hostname, () => {
    console.log(`🚀 Servidor rodando em http://${hostname}:${port}/`);
  });
}

startServer();
