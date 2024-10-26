const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir o cabeçalho 'apikey'
app.use(cors({
    origin: 'https://liandrolima.github.io', // Domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Cabeçalhos permitidos
    credentials: true
}));

// Monitorar e responder explicitamente à requisição preflight (OPTIONS) para o endpoint /resultados
app.options('/resultados', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': 'https://liandrolima.github.io',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey'
    });
    res.sendStatus(204); // Enviar status 204 para confirmar o sucesso da requisição preflight
});

// Outras configurações do servidor
app.use(express.json());

app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    console.log(`Nome: ${nome}, Acertos: ${acertos}, Total: ${total}`);
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Configuração da porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
