
CREATE TABLE IF NOT EXISTS vendas (
  id SERIAL PRIMARY KEY,
  id_cliente INT REFERENCES clientes(id),
  id_vendedor INT REFERENCES vendedores(id),
  data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itens_venda (
  id SERIAL PRIMARY KEY,
  venda_id INT REFERENCES vendas(id),
  produto_id INT REFERENCES produtos(id),
  quantidade INT NOT NULL,
  preco_unitario NUMERIC(10, 2) NOT NULL
);
