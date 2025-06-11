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

app.get('/vendedores', async (req, res) => {
  const result = await pool.query('SELECT * FROM vendedores');
  res.json(result.rows);
});

app.post('/vendedores', async (req, res) => {
  const { nome, cpf } = req.body;
  await pool.query('INSERT INTO vendedores (nome) VALUES ($1)', [nome]);
  res.status(201).send('Vendedor criado');
});

app.listen(3000, () => {
  console.log('Vendedores rodando na porta 3000');
});
