require('dotenv').config();  // Carrega as variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({
    origin: 'https://liandrolima.github.io',  // URL do frontend
    methods: ['GET', 'POST'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],  // Cabeçalhos permitidos
}));

// Middleware para lidar com preflight CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://liandrolima.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
    next();
});

app.use(bodyParser.json());

// Configuração do banco de dados
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Variável de ambiente para o banco de dados
});

// Verificação da conexão ao banco de dados
pool.connect()
    .then(() => console.log('Conexão ao banco de dados bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para armazenar os resultados
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
