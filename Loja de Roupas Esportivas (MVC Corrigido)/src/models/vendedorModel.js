const db = require('../db');

module.exports = {
  listarTodos: async () => {
    const result = await db.query('SELECT * FROM vendedores');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM vendedores WHERE id = $1', [id]);
    return result.rows[0];
  },

 criar: async (vendedor) => {
  const { nome, email } = vendedor;  
  const result = await db.query(
    'INSERT INTO vendedores (nome, email) VALUES ($1, $2) RETURNING *',
    [nome, email]
  );
  return result.rows[0];
},



  atualizar: async (id, vendedor) => {
    const { nome } = vendedor;
    const result = await db.query(
      'UPDATE vendedores SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM vendedores WHERE id = $1', [id]);
  }
};
