const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
const clienteRoutes = require('./routes/clienteRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

app.use('/clientes', clienteRoutes);
app.use('/vendedores', vendedorRoutes);
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);
app.use('/relatorios', relatorioRoutes);

app.get('/', (req, res) => {
  res.send('API da Loja Esportiva em execução.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
