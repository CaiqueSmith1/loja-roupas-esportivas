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

-- Inserção de clientes

INSERT INTO clientes (nome, email) VALUES 
('Lucas Silva', 'lucas.silva@gmail.com'),
('Amanda Costa', 'amanda.costa@gmail.com'),
('Juliana Rocha', 'juliana.rocha@gmail.com'),
('Mateus Ribeiro', 'mateus.ribeiro@gmail.com'),
('Fernanda Dias', 'fernanda.dias@gmail.com'),
('Rafael Torres', 'rafael.torres@gmail.com'),
('Camila Moraes', 'camila.moraes@gmail.com'),
('Bruno Martins', 'bruno.martins@gmail.com'),
('Aline Souza', 'aline.souza@gmail.com'),
('Felipe Almeida', 'felipe.almeida@gmail.com');

-- Inserção de vendedores

INSERT INTO vendedores (nome, email) VALUES 
('Roberta Lima', 'roberta.lima@gmail.com'),
('Carlos Mendes', 'carlos.mendes@gmail.com'),
('Paula Ferreira', 'paula.ferreira@gmail.com'),
('Eduardo Nunes', 'eduardo.nunes@gmail.com'),
('Mariana Teixeira', 'mariana.teixeira@gmail.com');

-- Inserção de produtos

INSERT INTO produtos (nome, categoria, preco, quantidade_estoque) VALUES
('Camiseta Dry-Fit', 'Roupas', 59.90, 100),
('Bermuda Esportiva', 'Roupas', 79.90, 80),
('Tênis Corrida Pro', 'Calçados', 299.90, 50),
('Garrafa Térmica', 'Acessórios', 39.90, 200),
('Mochila Esportiva', 'Acessórios', 149.90, 60),
('Jaqueta Corta Vento', 'Roupas', 129.90, 40),
('Meia Esportiva (pack 3)', 'Roupas', 29.90, 150),
('Boné Dry-Fit', 'Acessórios', 49.90, 90),
('Luvas de Academia', 'Acessórios', 35.90, 70),
('Tênis Casual Fitness', 'Calçados', 199.90, 45);

-- Inserção de vendas e itens

-- Venda 1
INSERT INTO vendas (cliente_id, vendedor_id) VALUES (1, 1);
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (1, 1, 2, 59.90);

-- Venda 2
INSERT INTO vendas (cliente_id, vendedor_id) VALUES (2, 2);
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (2, 3, 1, 299.90);

-- Venda 3
INSERT INTO vendas (cliente_id, vendedor_id) VALUES (3, 3);
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (3, 5, 1, 149.90);

-- Venda 4
INSERT INTO vendas (cliente_id, vendedor_id) VALUES (4, 4);
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (4, 4, 1, 39.90);

-- Venda 5
INSERT INTO vendas (cliente_id, vendedor_id) VALUES (5, 5);
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (5, 10, 2, 199.90);