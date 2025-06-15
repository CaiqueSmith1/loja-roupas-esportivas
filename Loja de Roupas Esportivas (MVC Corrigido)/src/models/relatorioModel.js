const db = require('../db');

module.exports = {
  produtosMaisVendidos: async () => {
    const result = await db.query(`
      SELECT p.nome, SUM(iv.quantidade) AS total_vendido
      FROM itens_venda iv
      JOIN produtos p ON iv.produto_id = p.id
      GROUP BY p.nome
      ORDER BY total_vendido DESC
      LIMIT 5
    `);
    return result.rows;
  },

  produtosPorCliente: async () => {
    const result = await db.query(`
      SELECT c.nome AS cliente, p.nome AS produto, SUM(iv.quantidade) AS quantidade
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      JOIN itens_venda iv ON iv.venda_id = v.id
      JOIN produtos p ON iv.produto_id = p.id
      GROUP BY c.nome, p.nome
      ORDER BY c.nome
    `);
    return result.rows;
  },

  consumoMedioPorCliente: async () => {
    const result = await db.query(`
      SELECT c.nome AS cliente, ROUND(AVG(COALESCE(iv.quantidade,0) * COALESCE(iv.preco_unitario,0)), 2) AS media_gasto
      FROM vendas v
      JOIN clientes c ON v.cliente_id = c.id
      JOIN itens_venda iv ON iv.venda_id = v.id
      GROUP BY c.nome
    `);
    return result.rows;
  },

  produtosComBaixoEstoque: async () => {
    const result = await db.query(`
      SELECT nome, quantidade_estoque
      FROM produtos
      WHERE quantidade_estoque <= 5
      ORDER BY quantidade_estoque ASC
    `);
    return result.rows;
  }
};
