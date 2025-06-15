const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  password: 'postgres',
  database: 'loja'
});

// Listar produtos
app.get('/produtos', async (req, res) => {
  const result = await pool.query('SELECT * FROM produtos');
  res.json(result.rows);
});

// Cadastrar novo produto
app.post('/produtos', async (req, res) => {
  const { nome, categoria, preco, quantidade_estoque } = req.body;
  await pool.query(
    'INSERT INTO produtos (nome, categoria, preco, quantidade_estoque) VALUES ($1, $2, $3, $4)',
    [nome, categoria, preco, quantidade_estoque]
  );
  res.status(201).send('Produto criado');
});

// Atualizar estoque
app.put('/produtos/:id/estoque', async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  await pool.query(
    'UPDATE produtos SET quantidade_estoque = $1 WHERE id = $2',
    [quantidade, id]
  );
  res.send('Estoque atualizado');
});

app.listen(3000, () => {
  console.log('Produtos rodando na porta 3000');
});
