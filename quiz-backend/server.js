const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'https://liandrolima.github.io',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Inclui 'apikey' explicitamente
    credentials: true
}));

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
