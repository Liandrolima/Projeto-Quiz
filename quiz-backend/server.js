const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Configurar CORS sem restrições temporariamente
app.use(cors());  // Permite todas as origens, cabeçalhos e métodos

app.use(express.json());

// Configurar pool de conexão com PostgreSQL
const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.jfazxnoryjdnopzonhzv',
    password: 'ejmFVZftQjwtSrEw3mGupQNXOxdlRmzx',
    database: 'postgres',
});

// Endpoint para salvar resultados
app.post('/resultados', async (req, res) => {
    const { nome, acertos, total } = req.body;

    if (!nome || typeof acertos !== 'number' || !Array.isArray(total)) {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    try {
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
