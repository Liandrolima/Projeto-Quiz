const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS
app.use(cors({
    origin: 'https://liandrolima.github.io', // O domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Cabeçalhos permitidos
    credentials: true
}));

// Outras rotas e middlewares
app.use(express.json());

app.options('/resultados', (req, res) => {
    console.log('Recebida requisição preflight para /resultados');
    res.header('Access-Control-Allow-Origin', 'https://liandrolima.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
    res.sendStatus(204); // Enviar status 204 para confirmar o sucesso da requisição preflight
});

app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    console.log(`Nome: ${nome}, Acertos: ${acertos}, Total: ${total}`);
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Configurar a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
