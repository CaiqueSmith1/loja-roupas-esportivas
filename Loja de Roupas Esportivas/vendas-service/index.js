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

// Rota para registrar nova venda
app.post('/vendas', async (req, res) => {
  const { id_cliente, id_vendedor, itens } = req.body;

  try {
    await pool.query('BEGIN');

    // Inserir venda
    const vendaResult = await pool.query(
      'INSERT INTO vendas (id_cliente, id_vendedor, data_venda) VALUES ($1, $2, NOW()) RETURNING id',
      [id_cliente, id_vendedor]
    );
    const vendaId = vendaResult.rows[0].id;

    // Inserir itens e atualizar estoque
    for (const item of itens) {
      const { produto_id, quantidade, preco_unitario } = item;

      // Verificar estoque
      const estoqueRes = await pool.query('SELECT quantidade_estoque FROM produtos WHERE id = $1', [produto_id]);
      if (estoqueRes.rows.length === 0) throw new Error(`Produto ID ${produto_id} não encontrado`);
      const estoqueAtual = estoqueRes.rows[0].quantidade_estoque;
      if (estoqueAtual < quantidade) throw new Error(`Estoque insuficiente para o produto ID ${produto_id}`);

      // Inserir item da venda
      await pool.query(
        'INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)',
        [vendaId, produto_id, quantidade, preco_unitario]
      );

      // Atualizar estoque
      await pool.query(
        'UPDATE produtos SET quantidade_estoque = quantidade_estoque - $1 WHERE id = $2',
        [quantidade, produto_id]
      );
    }

    await pool.query('COMMIT');
    res.status(201).json({ message: 'Venda registrada com sucesso', vendaId });

  } catch (error) {
    await pool.query('ROLLBACK');
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todas as vendas com itens
app.get('/vendas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        v.id AS venda_id,
        v.id_cliente,
        v.id_vendedor,
        v.data_venda,
        iv.produto_id,
        iv.quantidade,
        iv.preco_unitario
      FROM vendas v
      JOIN itens_venda iv ON v.id = iv.venda_id
      ORDER BY v.id DESC, iv.produto_id
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para cancelar uma venda
app.delete('/vendas/:id', async (req, res) => {
  const vendaId = req.params.id;

  try {
    await pool.query('BEGIN');

    // Buscar itens da venda
    const itensResult = await pool.query(
      'SELECT produto_id, quantidade FROM itens_venda WHERE venda_id = $1',
      [vendaId]
    );

    if (itensResult.rows.length === 0) {
      throw new Error('Venda não encontrada ou sem itens');
    }

    // Restaurar o estoque
    for (const item of itensResult.rows) {
      await pool.query(
        'UPDATE produtos SET quantidade_estoque = quantidade_estoque + $1 WHERE id = $2',
        [item.quantidade, item.produto_id]
      );
    }

    // Excluir itens da venda
    await pool.query('DELETE FROM itens_venda WHERE venda_id = $1', [vendaId]);

    // Excluir a venda
    await pool.query('DELETE FROM vendas WHERE id = $1', [vendaId]);

    await pool.query('COMMIT');
    res.status(200).json({ message: 'Venda cancelada com sucesso' });

  } catch (error) {
    await pool.query('ROLLBACK');
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Vendas rodando na porta 3000');
});
