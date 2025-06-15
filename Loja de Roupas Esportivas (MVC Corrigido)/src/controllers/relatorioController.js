const relatorioModel = require('../models/relatorioModel');

module.exports = {
  maisVendidos: async (req, res) => {
    try {
      const dados = await relatorioModel.produtosMaisVendidos();
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao gerar relatório de mais vendidos.' });
    }
  },

  porCliente: async (req, res) => {
    try {
      const dados = await relatorioModel.produtosPorCliente();
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao gerar relatório por cliente.' });
    }
  },

  consumoMedio: async (req, res) => {
    try {
      const dados = await relatorioModel.consumoMedioPorCliente();
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao gerar consumo médio por cliente.' });
    }
  },

  baixoEstoque: async (req, res) => {
    try {
      const dados = await relatorioModel.produtosComBaixoEstoque();
      res.json(dados);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao gerar relatório de baixo estoque.' });
    }
  }
};
