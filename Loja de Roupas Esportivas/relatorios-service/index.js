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

const router = express.Router();

// 1 - Vendas por cliente
router.get('/vendas/cliente', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.nome, COUNT(v.id) AS total_vendas, 
             SUM(iv.quantidade * iv.preco_unitario) AS total_gasto
      FROM clientes c
      LEFT JOIN vendas v ON c.id = v.id_cliente
      LEFT JOIN itens_venda iv ON v.id = iv.venda_id
      GROUP BY c.id
      ORDER BY total_gasto DESC NULLS LAST
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2 - Vendas por produto
router.get('/vendas/produto', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.nome, 
             SUM(iv.quantidade) AS total_vendido, 
             SUM(iv.quantidade * iv.preco_unitario) AS receita_total
      FROM produtos p
      LEFT JOIN itens_venda iv ON p.id = iv.produto_id
      GROUP BY p.id
      ORDER BY receita_total DESC NULLS LAST
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3 - Vendas por vendedor
router.get('/vendas/vendedor', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT vdr.id, vdr.nome, COUNT(v.id) AS total_vendas, 
             SUM(iv.quantidade * iv.preco_unitario) AS total_vendido
      FROM vendedores vdr
      LEFT JOIN vendas v ON vdr.id = v.id_vendedor
      LEFT JOIN itens_venda iv ON v.id = iv.venda_id
      GROUP BY vdr.id
      ORDER BY total_vendido DESC NULLS LAST
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4 - Produtos mais vendidos
router.get('/produtos-mais-vendidos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.nome, SUM(iv.quantidade) AS total_vendido
      FROM produtos p
      JOIN itens_venda iv ON p.id = iv.produto_id
      GROUP BY p.id
      ORDER BY total_vendido DESC
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5 - Produto por cliente (consumo detalhado)
router.get('/produtos-por-cliente', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id AS cliente_id, c.nome AS cliente_nome,
             p.id AS produto_id, p.nome AS produto_nome,
             SUM(iv.quantidade) AS quantidade_comprada
      FROM clientes c
      JOIN vendas v ON c.id = v.id_cliente
      JOIN itens_venda iv ON v.id = iv.venda_id
      JOIN produtos p ON iv.produto_id = p.id
      GROUP BY c.id, c.nome, p.id, p.nome
      ORDER BY c.id, quantidade_comprada DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6 - Consumo médio do cliente
router.get('/consumo-medio-cliente', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.nome, 
             AVG(iv.quantidade * iv.preco_unitario) AS consumo_medio
      FROM clientes c
      JOIN vendas v ON c.id = v.id_cliente
      JOIN itens_venda iv ON v.id = iv.venda_id
      GROUP BY c.id, c.nome
      ORDER BY consumo_medio DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7 - Produtos com baixo estoque (menos que 5 unidades)
router.get('/produtos-baixo-estoque', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nome, quantidade_estoque
      FROM produtos
      WHERE quantidade_estoque < 5
      ORDER BY quantidade_estoque ASC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar o router com o prefixo /relatorios
app.use('/relatorios', router);

// Rodar servidor na porta 3005
app.listen(3005, () => {
  console.log('Relatórios rodando na porta 3005');
});
