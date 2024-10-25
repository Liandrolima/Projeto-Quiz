const express = require('express');
const app = express();

// Middleware para configurar cabeçalhos CORS manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://liandrolima.github.io'); // Permite a origem específica do frontend
  res.setHeader('Access-Control-Allow-Origin', 'https://quiz-backend-1-05r8.onrender.com/resultados');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey'); // Cabeçalhos permitidos
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permite envio de credenciais
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Responde às requisições preflight
  }
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
