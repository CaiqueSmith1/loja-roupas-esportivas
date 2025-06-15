const vendaModel = require('../models/vendaModel');

module.exports = {
  listarVendas: async (req, res) => {
    try {
      const vendas = await vendaModel.listarTodas();
      res.json(vendas);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar vendas.' });
    }
  },

  buscarVenda: async (req, res) => {
    try {
      const venda = await vendaModel.buscarPorId(req.params.id);
      if (!venda.venda) return res.status(404).json({ erro: 'Venda não encontrada.' });
      res.json(venda);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar venda.' });
    }
  },

  criarVenda: async (req, res) => {
    try {
      const novaVenda = await vendaModel.criar(req.body);
      res.status(201).json(novaVenda);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao registrar venda.', detalhes: err.message });
    }
  },

  cancelarVenda: async (req, res) => {
    try {
      await vendaModel.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao cancelar venda.' });
    }
  }
};
