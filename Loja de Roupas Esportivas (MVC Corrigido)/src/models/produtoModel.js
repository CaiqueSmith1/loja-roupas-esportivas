const db = require('../db');

module.exports = {
  listarTodos: async () => {
    const result = await db.query('SELECT * FROM produtos');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    return result.rows[0];
  },

  criar: async (produto) => {
    const { nome, categoria, preco, quantidade_estoque } = produto;
    const result = await db.query(
      'INSERT INTO produtos (nome, categoria, preco, quantidade_estoque) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, categoria, preco, quantidade_estoque]
    );
    return result.rows[0];
  },

  atualizar: async (id, produto) => {
    const { nome, categoria, preco, quantidade_estoque } = produto;
    const result = await db.query(
      'UPDATE produtos SET nome = $1, categoria = $2, preco = $3, quantidade_estoque = $4 WHERE id = $5 RETURNING *',
      [nome, categoria, preco, quantidade_estoque, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM produtos WHERE id = $1', [id]);
  }
};
