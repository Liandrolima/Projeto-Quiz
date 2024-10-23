require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({
    origin: 'https://liandrolima.github.io',  // Permitir requisições do seu frontend no GitHub Pages
    methods: ['GET', 'POST'],  // Permitir os métodos usados
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],  // Permitir os cabeçalhos, incluindo 'apikey'
}));

app.use(bodyParser.json());

// Configuração do pool de conexão ao PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Variável de ambiente para o banco de dados
});

console.log('Conectando ao banco de dados:', process.env.DATABASE_URL);

// Verifica a conexão com o banco de dados
pool.connect()
    .then(() => console.log('Conexão ao banco de dados bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para receber e armazenar os resultados
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    console.log('Dados recebidos:', nome, acertos, total);

    if (!nome || typeof acertos !== 'number' || typeof total !== 'number') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    const sql = 'INSERT INTO resultados (nome, acertos, total) VALUES ($1, $2, $3)';
    pool.query(sql, [nome, acertos, total])
        .then(() => res.status(201).json({ message: 'Resultados armazenados com sucesso!' }))
        .catch(err => {
            console.error('Erro ao armazenar resultados:', err);
            res.status(500).json({ error: 'Erro ao armazenar resultados', details: err });
        });
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
