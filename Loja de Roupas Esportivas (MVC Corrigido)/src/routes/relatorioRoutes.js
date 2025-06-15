const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/mais-vendidos', relatorioController.maisVendidos);
router.get('/por-cliente', relatorioController.porCliente);
router.get('/consumo-medio', relatorioController.consumoMedio);
router.get('/baixo-estoque', relatorioController.baixoEstoque);

module.exports = router;
