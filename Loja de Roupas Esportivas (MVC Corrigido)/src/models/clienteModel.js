const db = require('../db');

module.exports = {
  listarTodos: async () => {
    const result = await db.query('SELECT * FROM clientes');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
  },

  criar: async (cliente) => {
    const { nome, email } = cliente;
    const result = await db.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    return result.rows[0];
  },

  atualizar: async (id, cliente) => {
    const { nome, email } = cliente;
    const result = await db.query(
      'UPDATE clientes SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM clientes WHERE id = $1', [id]);
  }
};
