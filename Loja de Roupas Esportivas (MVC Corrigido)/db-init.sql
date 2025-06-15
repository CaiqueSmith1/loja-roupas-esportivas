CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE vendedores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  categoria VARCHAR(50),
  preco NUMERIC(10,2),
  quantidade_estoque INTEGER
);

CREATE TABLE vendas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  vendedor_id INTEGER REFERENCES vendedores(id),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_venda (
  id SERIAL PRIMARY KEY,
  venda_id INTEGER REFERENCES vendas(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER,
  preco_unitario NUMERIC(10,2)
);
