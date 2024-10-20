require('dotenv').config();
console.log(process.env); 
const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// Log para verificar se as variáveis de ambiente estão corretas
console.log('DB_HOST:', process.env.DB_HOST);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usando a URL de conexão
    connectionTimeoutMillis: 5000
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados PostgreSQL');
});

app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;

    // Validação simples
    if (!nome || typeof acertos !== 'number' || typeof total !== 'number') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    const sql = 'INSERT INTO resultados (nome, acertos, total) VALUES ($1, $2, $3)';
    
    pool.query(sql, [nome, acertos, total], (err) => {
        if (err) {
            console.error('Erro ao armazenar resultados:', err); // Log do erro
            return res.status(500).json({ error: 'Erro ao armazenar resultados' });
        }
        res.status(201).json({ message: 'Resultados armazenados com sucesso!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const sendResultsToDatabase = (name, score, answers) => {
    fetch('https://quiz-backend-zdxz.onrender.com/resultados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            acertos: score,
            total: answers.length // Total de respostas
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
    });
};
