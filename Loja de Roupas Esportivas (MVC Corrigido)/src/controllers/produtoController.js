const produtoModel = require('../models/produtoModel');

module.exports = {
  listarProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.listarTodos();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar produtos.' });
    }
  },

  buscarProduto: async (req, res) => {
    try {
      const produto = await produtoModel.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
      res.json(produto);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar produto.' });
    }
  },

  criarProduto: async (req, res) => {
    try {
      const novoProduto = await produtoModel.criar(req.body);
      res.status(201).json(novoProduto);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar produto.' });
    }
  },

  atualizarProduto: async (req, res) => {
    try {
      const produtoAtualizado = await produtoModel.atualizar(req.params.id, req.body);
      res.json(produtoAtualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar produto.' });
    }
  },

  deletarProduto: async (req, res) => {
    try {
      await produtoModel.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar produto.' });
    }
  }
};
