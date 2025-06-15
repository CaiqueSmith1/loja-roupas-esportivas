const clienteModel = require('../models/clienteModel');

module.exports = {
  listarClientes: async (req, res) => {
    try {
      const clientes = await clienteModel.listarTodos();
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar clientes.' });
    }
  },

  buscarCliente: async (req, res) => {
    try {
      const cliente = await clienteModel.buscarPorId(req.params.id);
      if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado.' });
      res.json(cliente);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar cliente.' });
    }
  },

  criarCliente: async (req, res) => {
    try {
      const novoCliente = await clienteModel.criar(req.body);
      res.status(201).json(novoCliente);
    } catch (err) {
     console.error('Erro ao criar cliente:', err);
      res.status(500).json({ erro: 'Erro ao criar cliente.' });
    }
  },

  atualizarCliente: async (req, res) => {
    try {
      const clienteAtualizado = await clienteModel.atualizar(req.params.id, req.body);
      res.json(clienteAtualizado);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
    }
  },

  deletarCliente: async (req, res) => {
    try {
      await clienteModel.deletar(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar cliente.' });
    }
  }
};
