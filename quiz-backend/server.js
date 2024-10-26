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

// Monitorar requisições preflight (OPTIONS) para o endpoint /resultados
app.options('/resultados', (req, res) => {
    console.log('Preflight request recebida para /resultados');
    res.sendStatus(204); // Responder com status 204 (No Content) para requisições preflight
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
