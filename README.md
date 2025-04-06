# 🌤️ Weather Forecast Dashboard with MongoDB + Express API

Este projeto é um **dashboard meteorológico** que consome dados reais de uma API construída com **Node.js + Express** e um banco de dados **MongoDB**. A interface é feita em **React + Tailwind CSS (via CDN)**.

O frontend (React) e o backend (Node.js + Express) estão hospedados separadamente:

- O **frontend** está hospedado no **Netlify**
- Repositório: https://github.com/nicholetzs/node-server-client
- Site: https://forecasttemperatur.netlify.app/

Clique em atualizar previsões para buscar os dados do MongoDb! ☄️

- O **backend** está hospedado no **Render**

Eles se comunicam por meio de **requisições HTTP (`fetch`)**, configurando o `proxy` para aceitar chamadas da URL do backend hospedado.

---

## 🚀 Como começar

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

### 📦 Pré-requisitos

- Node.js (v16+ recomendado)
- MongoDB Atlas ou local
- Conta no [Render](https://render.com/) (para o backend)
- Conta no [Netlify](https://www.netlify.com/) (para o frontend)

---

## 🧭 Estrutura do projeto

- **Backend**: API REST em Node.js que lê e salva previsões no MongoDB
- **Frontend**: Interface React com Tailwind (CDN), consumindo os dados da API hospedada no Render

---

## 🛠️ Scripts disponíveis (frontend)

Na pasta do projeto frontend, você pode rodar:

### `npm start`

Roda o app em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `npm test`

Roda os testes interativos. Veja mais em [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Cria a versão de produção na pasta `build`.

---

## 🧪 Backend - Estrutura da API com Express + MongoDB

### 📁 Arquivos principais:

#### `db.js` - Conexão com MongoDB

```js
// db.js - Configuração da conexão com o MongoDB
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const nameDb = process.env.DB;

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
    return client.db(nameDb);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

export { client };
```

#### `index.js` - Servidor principal

```js
import { connectDB } from "./db.js";
import express from "express";
import { getWeatherData } from "./weather.js";
import dotenv from "dotenv";
import { saveWeatherData } from "./weatherSave.js";
import cors from "cors";
import { weatherLimiter } from "./weatherLimit.js"; // Importa o limitador de requisições

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const port = process.env.PORT; // Render define a porta automaticamente

async function startServer() {
  const db = await connectDB(); // Conecta ao MongoDB antes de iniciar o servidor
  const app = express();

  const allowedOrigins = [
    "http://localhost:3000", // Usei para desenvolvimento local com react
    "https://whitenights.onrender.com", // Para desenvolvimento local e acessar as rotas
    "https://forecasttemperatur.netlify.app", // Para acessar as rotas do Netlify
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
    const token = req.headers["authorization"]; // Obtém o token do cabeçalho da requisição
    const secretToken = process.env.SECRET_TOKEN;

    if (token !== `Bearer ${secretToken}`) {
      console.error("Token inválido, não autorizado.");
      return res.status(403).json({ error: "Acesso não autorizado." });
    }
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
```

#### `weather.js` - Busca dados da API externa

```js
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
```

#### `weatherSave.js` - Salva previsões no banco

```js
import { connectDB } from "./db.js";
import { getWeatherData } from "./weather.js";

export async function saveWeatherData() {
  try {
    const data = await getWeatherData(); // Obtém os dados da API

    const db = await connectDB();
    const collection = db.collection("collection-weather"); // Define a coleção

    const weatherData = data.list.map((forecast) => ({
      timestamp: new Date(forecast.dt * 1000),
      temperature: forecast.main.temp,
      temperature_min: forecast.main.temp_min, // Temperatura mínima
      temperature_max: forecast.main.temp_max, // Temperatura máxima
      humidity: forecast.main.humidity,
      weather: forecast.weather[0].description,
      weather_icon: forecast.weather[0].icon,
      wind_speed: forecast.wind.speed,
      rain: forecast.rain ? true : false,
      location: "Vitória",
    }));

    const result = await collection.insertMany(weatherData);
    console.log("✅ Dados meteorológicos salvos no MongoDB!");

    return result; // Retorna os dados inseridos
  } catch (error) {
    console.error("Erro ao salvar os dados no banco de dados:", error);
  }
}
```

#### `weatherLimit.js` - Limite de requisição para atualizar dados

```js
import rateLimit from "express-rate-limit";

export const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true, // Envia headers padrão como RateLimit-*
  legacyHeaders: false, // Remove os headers `X-RateLimit-*` antigos
  message: "Muitas requisições desta máquina. Tente novamente mais tarde.",
});
```

---

## 🎨 Frontend - React + Tailwind via CDN

### Instalação

```bash
npx create-react-app weather-dashboard
cd weather-dashboard
```

### Adicionar Tailwind CDN

No arquivo `public/index.html`, adicione dentro da `<head>`:

```html
<link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
  rel="stylesheet"
/>
```

---

## 🔄 Integração com API

No componente `WeatherDashboards`:

```jsx
const [previsoes, setPrevisoes] = useState([]);

const buscarPrevisoes = async () => {
  setLoading(true);
  try {
    const resposta = await fetch(
      "https://whitenights.onrender.com/weatherList"
    );
    const dados = await resposta.json();
    setPrevisoes(dados);
  } catch (erro) {
    console.error("Erro ao buscar previsões:", erro);
  } finally {
    setLoading(false);
  }
};

<div className="flex items-center gap-4">
  <AtualizarPrevisoes onAtualizar={buscarPrevisoes} loading={loading} />
</div>;
```

A função `buscarPrevisoes` busca os dados no MongoDb.

O frontend utiliza o **proxy** do `package.json` e configurações CORS no backend para permitir essa comunicação com domínios diferentes entre Netlify e Render.

---

## 🧩 Componentes

- `WeatherCard`: exibe uma previsão individual (dia, temperatura, condição)
- `AtualizarPrevisoes`: botão para atualizar as previsões com a função `buscarPrevisoes`

---

## 🌐 Deploy da API

A API está hospedada em:

```
https://whitenights.onrender.com/weatherSave
```

O frontend está hospedado em:

```
https://forecasttemperatur.netlify.app/
```

---

## 📚 Aprenda mais

- [Documentação Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/play-cdn)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Render Deploy](https://render.com/docs/deploy-node-express-app)
- [Netlify Deploy](https://docs.netlify.com/)

---

Feito com ☕ e curiosidade por **Nichole** 🪐

🧊 E agora sobre temp mínima e máxima:
A OpenWeather API retorna dados de previsão a cada 3 horas, ou seja:

00h → 23.5°C

03h → 21.7°C

06h → 20.1°C

...

21h → 24.8°C

Se você agrupar todos os dados do mesmo dia, consegue descobrir:

🔺Temp máxima do dia: 24.8°C

🔻Temp mínima do dia: 20.1°C
