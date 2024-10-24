const express = require('express');
const cors = require('cors');
const app = express();

// Configurando CORS para permitir o frontend hospedado no GitHub Pages
app.use(cors({
  origin: 'https://liandrolima.github.io',  // Permitir o domínio do frontend
  methods: ['GET', 'POST'],  // Métodos permitidos
  allowedHeaders: ['Content-Type', 'apikey']  // Cabeçalhos permitidos
}));

// O restante da configuração do seu servidor
app.use(express.json());

app.post('/resultados', (req, res) => {
  // Lógica para processar os dados enviados
  res.status(200).json({ message: 'Dados recebidos com sucesso' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
