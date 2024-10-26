const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS com allowedHeaders incluído explicitamente
const corsOptions = {
    origin: 'https://liandrolima.github.io',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Lidar com as requisições preflight

// Outras rotas e middlewares
app.use(express.json());

app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    console.log(`Nome: ${nome}, Acertos: ${acertos}, Total: ${total}`);
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
