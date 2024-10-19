const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Cria uma instância do express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql102030', // Altere para sua senha do MySQL
    database: 'quiz_db' // Altere para o nome do seu banco de dados
});

// Conecta ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para armazenar os resultados do quiz
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    const sql = 'INSERT INTO resultados (nome, acertos, total) VALUES (?, ?, ?)';
    
    db.query(sql, [nome, acertos, total], (err, result) => {
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
    fetch('http://localhost:3000/resultados', {
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
// Remova ou adapte isso para quando realmente tiver os resultados do quiz
const answers = [
    { question: "Pergunta 1", userAnswer: "Resposta 1", correctAnswer: "Resposta 1" },
    { question: "Pergunta 2", userAnswer: "Resposta 2", correctAnswer: "Resposta 3" },
    // Adicione todas as respostas do quiz
];

// Enviar resultados como exemplo - remova ou adapte conforme necessário
sendResultsToDatabase();
