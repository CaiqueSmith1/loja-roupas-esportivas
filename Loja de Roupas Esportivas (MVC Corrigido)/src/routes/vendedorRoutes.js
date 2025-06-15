const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedorController');

router.get('/', vendedorController.listarVendedores);
router.get('/:id', vendedorController.buscarVendedor);
router.post('/', vendedorController.criarVendedor);
router.put('/:id', vendedorController.atualizarVendedor);
router.delete('/:id', vendedorController.deletarVendedor);

module.exports = router;
