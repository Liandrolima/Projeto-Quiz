const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir o cabeçalho 'apikey'
app.use(cors({
    origin: 'https://liandrolima.github.io', // O domínio do frontend
    methods: ['GET', 'POST', 'OPTIONS'],     // Permitir esses métodos
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'], // Cabeçalhos permitidos
    credentials: true  // Se precisar suportar cookies ou autenticação via credenciais
}));

// Middleware para permitir JSON
app.use(express.json());

// Definir a rota POST /resultados
app.post('/resultados', (req, res) => {
    const { nome, acertos, total } = req.body;
    
    // Lógica de armazenamento dos dados
    console.log(`Nome: ${nome}, Acertos: ${acertos}, Total: ${total}`);
    
    // Enviar resposta de sucesso
    res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

// Configurar a porta para o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
