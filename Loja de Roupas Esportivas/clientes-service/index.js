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

app.get('/clientes', async (req, res) => {
  const result = await pool.query('SELECT * FROM clientes');
  res.json(result.rows);
});

app.post('/clientes', async (req, res) => {
  const { nome, email, telefone } = req.body;
  await pool.query('INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3)', [nome, email, telefone]);
  res.status(201).send('Cliente criado');
});

app.listen(3000, () => {
  console.log('Clientes rodando na porta 3000');
});
