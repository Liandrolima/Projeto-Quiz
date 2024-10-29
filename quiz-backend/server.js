const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

app.use(express.json());
// Configuração de CORS
const allowedOrigins = ['https://liandrolima.github.io', 'http://127.0.0.1:5500'];
app.use(cors({
    origin: function (origin, callback) {
        // Permitir requisições sem origem (ex. Thunder Client)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // Habilitar suporte para requisições OPTIONS



// Configurar pool de conexão com PostgreSQL
const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.jfazxnoryjdnopzonhzv',
    password: 'ejmFVZftQjwtSrEw3mGupQNXOxdlRmzx',
    database: 'postgres',
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conectado ao banco de dados PostgreSQL');
    release();
});
app.get('/resultados', (req, res) => {
    res.send("Endpoint /resultados está ativo e funcionando!");
});


// Endpoint para salvar resultados
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;

    // Verifique se os dados necessários estão presentes
    if (!nome || typeof acertos === 'undefined' || typeof total === 'undefined') {
        return res.status(400).json({ error: 'Dados inválidos fornecidos' });
    }

    // Aqui você pode armazenar os dados no banco de dados, etc.
    console.log('Dados recebidos:', { nome, acertos, total });

    res.status(200).json({ message: 'Resultados armazenados com sucesso!' });
});


// Configurar a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
