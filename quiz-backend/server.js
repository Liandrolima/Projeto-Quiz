const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS
app.use(cors({
    origin: 'https://liandrolima.github.io', // O domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Permitir o cabeçalho 'apikey'
    credentials: true
}));

// Middleware para configurar cabeçalhos CORS manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey'); // Cabeçalhos permitidos
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Rota para receber resultados
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    // Lógica de armazenamento dos dados
    console.log(`Nome: ${nome}, Acertos: ${acertos}, Total: ${total}`);
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Configurar a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
