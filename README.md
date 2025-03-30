# 🌤️ Projeto: White Nights

## 📌 Descrição
White Nights é um projeto pequeno que coleta e armazena previsões meteorológicas de 3 em 3 horas em Vitória, ES. Utilizando a API **OpenWeatherMap**, a aplicação salva dados de previsão do tempo em um banco **MongoDB**, permitindo análises futuras.

## 🚀 Tecnologias Utilizadas
- **Node.js** (Back-end)
- **Express.js** (Framework para API)
- **MongoDB** (Banco de dados NoSQL)
- **OpenWeatherMap API** (Coleta de dados meteorológicos)
- **Dotenv** (Gerenciamento de variáveis de ambiente)
- **Render** (Hospedagem da aplicação completa)
- MongoDB Driver: Conexão e manipulação do banco de dados
- Fetch API: Para consumir os dados da OpenWeatherMap

---

## 📂 Estrutura do Projeto
```
📁 whitenights
│── 📄 index.js          # Arquivo principal do servidor Express e rotas
│── 📄 weather.js         # Função para buscar dados da API OpenWeatherMap
│── 📄 db.js              # Conexão com MongoDB
│── 📄 weatherService.js  # Função para salvar dados no db
│── 📄 .env               # Variáveis de ambiente (API Key e credenciais do banco)
│── 📄 package.json       # Dependências e scripts do projeto
```

---

## ⚙️ Configuração do Projeto
### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/whitenights.git
cd whitenights
```

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente
Crie um arquivo **.env** na raiz do projeto e adicione:
```ini
WEATHER_API_KEY=your_openweathermap_api_key
MONGO_URI=your_mongodb_connection_string
DB=your_database_name
```

### 4️⃣ Iniciar o Servidor
```bash
npm start
```

---

## 🌎 Rotas da API

### 🔹 Obter dados meteorológicos e salvar no banco
**POST** 
```bash
curl -X POST "https://whitenights.onrender.com/weatherSave"
```
**Resposta (JSON):**
```json
{
  "data": [ {...} ]
}
```
**GET**
Obter Previsão do Tempo
GET /weather
Retorna a previsão meteorológica de 3 em 3 horas para o dia atual.



---

## 🛠️ Possíveis Melhorias
✅ Fazer front end
✅ Criar verificação de acessos para API (?)



---

