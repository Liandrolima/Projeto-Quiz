const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir o cabeçalho 'apikey'
app.use(cors({
    origin: 'https://liandrolima.github.io', // Domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Inclui 'apikey'
    credentials: true
}));

// Configurações de outras rotas e middlewares
app.use(express.json());

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
