const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importa o cliente PostgreSQL
const app = express();

// Configurar CORS
app.use(cors({
    origin: 'https://liandrolima.github.io', // O domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Cabeçalhos permitidos
    credentials: true
}));

app.use(express.json());

// Configurar pool de conexão com PostgreSQL
const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com', // substitua com o host do Supabase
    port: 6543,                                  // substitua pela porta correta do Supabase, se for diferente
    user: 'postgres.jfazxnoryjdnopzonhzv',       // substitua pelo seu usuário do Supabase
    password: 'ejmFVZftQjwtSrEw3mGupQNXOxdlRmzx', // substitua pela sua senha
    database: 'postgres',                         // substitua pelo nome do seu banco de dados
});

// Endpoint para salvar resultados
app.post('/resultados', async (req, res) => {
    const { nome, acertos, total } = req.body;

    if (!nome || typeof acertos !== 'number' || !Array.isArray(total)) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    try {
        // Inserir dados no banco de dados
        await pool.query('INSERT INTO resultados (nome, acertos, total) VALUES ($1, $2, $3)', [nome, acertos, JSON.stringify(total)]);
        res.status(200).json({ message: 'Dados salvos com sucesso no banco de dados' });
    } catch (error) {
        console.error('Erro ao salvar no banco de dados:', error);
        res.status(500).json({ message: 'Erro ao salvar dados' });
    }
});

// Configurar a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
