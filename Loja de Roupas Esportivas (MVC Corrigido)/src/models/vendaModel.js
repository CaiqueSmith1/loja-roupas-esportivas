const db = require('../db');

module.exports = {
  listarTodas: async () => {
    const result = await db.query(`
      SELECT v.id, v.data, c.nome AS cliente, ve.nome AS vendedor
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      JOIN vendedores ve ON v.vendedor_id = ve.id
    `);
    return result.rows;
  },

  buscarPorId: async (id) => {
    const venda = await db.query(
      `SELECT * FROM vendas WHERE id = $1`, [id]
    );
    const itens = await db.query(
      `SELECT iv.*, p.nome FROM itens_venda iv
       JOIN produtos p ON iv.produto_id = p.id
       WHERE iv.venda_id = $1`, [id]
    );
    return {
      venda: venda.rows[0],
      itens: itens.rows
    };
  },

  criar: async ({ cliente_id, vendedor_id, itens }) => {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const resultVenda = await client.query(
        `INSERT INTO vendas (cliente_id, vendedor_id) VALUES ($1, $2) RETURNING *`,
        [cliente_id, vendedor_id]
      );
      const vendaId = resultVenda.rows[0].id;

      for (const item of itens) {
        const { produto_id, quantidade, preco_unitario } = item;

        await client.query(
          `INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario)
           VALUES ($1, $2, $3, $4)`,
          [vendaId, produto_id, quantidade, preco_unitario]
        );

        await client.query(
          `UPDATE produtos SET quantidade_estoque = quantidade_estoque - $1 WHERE id = $2`,
          [quantidade, produto_id]
        );
      }

      await client.query('COMMIT');
      return resultVenda.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  deletar: async (id) => {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const itens = await client.query(
        `SELECT produto_id, quantidade FROM itens_venda WHERE venda_id = $1`,
        [id]
      );

      for (const item of itens.rows) {
        await client.query(
          `UPDATE produtos SET quantidade_estoque = quantidade_estoque + $1 WHERE id = $2`,
          [item.quantidade, item.produto_id]
        );
      }

      await client.query(`DELETE FROM itens_venda WHERE venda_id = $1`, [id]);
      await client.query(`DELETE FROM vendas WHERE id = $1`, [id]);

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
};
