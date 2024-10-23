require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware para CORS
app.use(cors({
    origin: 'https://liandrolima.github.io',  // Permitir requisições do seu frontend
    methods: ['GET', 'POST', 'OPTIONS'],  // Incluir o método 'OPTIONS' para lidar com preflight
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],  // Incluir 'apikey'
}));

// Middleware adicional para lidar com preflight CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://liandrolima.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);  // Responder OK (200) para requisições preflight
    }

    next();
});

app.use(bodyParser.json());

// Configuração do pool de conexão ao PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
