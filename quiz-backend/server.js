const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Adicionando o cliente PostgreSQL

// Cria uma instância do express
const app = express();
app.use(cors());
app.use(bodyParser.json());
const { Pool } = require('pg');

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // A porta padrão do PostgreSQL
});


db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados PostgreSQL');
    }
});

// Testar conexão com o banco de dados
pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados PostgreSQL');
});

// Rota para armazenar os resultados do quiz
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    const sql = 'INSERT INTO resultados (nome, acertos, total) VALUES ($1, $2, $3)';
    
    pool.query(sql, [nome, acertos, total], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao armazenar resultados' });
        }
        res.status(201).json({ message: 'Resultados armazenados com sucesso!' });
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Função para enviar resultados para o banco de dados
const sendResultsToDatabase = (name, score, answers) => {
    fetch('http://ENDERECO_DO_SEU_SERVIDOR:3000/resultados', {
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

// Exemplo de como você poderia chamar essa função no final do quiz
const answers = [
    { question: "Pergunta 1", userAnswer: "Resposta 1", correctAnswer: "Resposta 1" },
    { question: "Pergunta 2", userAnswer: "Resposta 2", correctAnswer: "Resposta 3" }
];

// Enviar resultados como exemplo - remova ou adapte conforme necessário
sendResultsToDatabase('Exemplo de Nome', 8, answers);
