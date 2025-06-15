const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

router.get('/', vendaController.listarVendas);
router.get('/:id', vendaController.buscarVenda);
router.post('/', vendaController.criarVenda);
router.delete('/:id', vendaController.cancelarVenda); // cancelamento

module.exports = router;
