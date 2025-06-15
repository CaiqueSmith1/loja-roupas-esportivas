const vendedorModel = require('../models/vendedorModel');

module.exports = {
  listarVendedores: async (req, res) => {
    try {
      const vendedores = await vendedorModel.listarTodos();
      res.json(vendedores);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar vendedores.' });
    }
  },

  buscarVendedor: async (req, res) => {
    try {
      const vendedor = await vendedorModel.buscarPorId(req.params.id);
      if (!vendedor) return res.status(404).json({ erro: 'Vendedor não encontrado.' });
      res.json(vendedor);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar vendedor.' });
    }
  },

  criarVendedor: async (req, res) => {
    try {
      const novoVendedor = await vendedorModel.criar(req.body);
      res.status(201).json(novoVendedor);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar vendedor.' });
    }
  },

  atualizarVendedor: async (req, res) => {
    try {
      const vendedorAtualizado = await vendedorModel.atualizar(req.params.id, req.body);
      res.json(vendedorAtualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar vendedor.' });
    }
  },

  deletarVendedor: async (req, res) => {
    try {
      await vendedorModel.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar vendedor.' });
    }
  }
};
