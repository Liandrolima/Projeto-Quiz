const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

app.use(express.json());


app.use(cors());

// Configurar pool de conexão com PostgreSQL
const pool = new Pool({
  host: "aws-0-sa-east-1.pooler.supabase.com",
  port: 6543,
  user: "postgres.jfazxnoryjdnopzonhzv",
  password: "ejmFVZftQjwtSrEw3mGupQNXOxdlRmzx",
  database: "postgres",
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Erro ao conectar ao banco de dados:", err.stack);
  }
  console.log("Conectado ao banco de dados PostgreSQL");
  release();
});

app.get("/resultados", (req, res) => {
  res.send("Endpoint /resultados está ativo e funcionando!");
});

// Endpoint para salvar resultados
app.post("/resultados", async (req, res) => {
  try {
    const { nome, acertos, perguntas } = req.body;
    // Código para inserir dados no banco de dados, por exemplo:
    await pool.query(
      "INSERT INTO resultados (nome, acertos, perguntas) VALUES ($1, $2, $3)",
      [nome, acertos, perguntas]
    );
    res.status(200).json({ message: "Resultados armazenados com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    res.status(500).json({ message: "Erro ao salvar dados." });
  }
});

// Configurar a porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
