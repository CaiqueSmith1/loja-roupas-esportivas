# 🏪 Loja de Roupas Esportivas - Sistema Distribuído

Este projeto simula as operações de uma rede de lojas especializada em roupas esportivas. A aplicação foi desenvolvida utilizando uma arquitetura de microsserviços em containers Docker, com comunicação via APIs RESTful e banco de dados PostgreSQL centralizado.

## 📦 Serviços do Sistema

O sistema é dividido em 5 microsserviços:

- **Clientes Service:** Cadastro e gerenciamento de clientes
- **Vendedores Service:** Cadastro e gerenciamento de vendedores
- **Produtos Service:** Controle de produtos e estoque
- **Vendas Service:** Processamento e cancelamento de pedidos de venda
- **Relatórios Service:** Geração de relatórios analíticos

Todos os serviços expõem suas APIs na **porta 3000**.

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- PostgreSQL
- Docker + Docker Compose
- Axios (comunicação entre serviços)

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/CaiqueSmith1/loja-roupas-esportivas.git
cd loja-roupas-esportivas
```

2. **Suba os serviços com Docker Compose:**

```bash
docker-compose up --build
```

3. **Acesse a API via navegador ou Postman:**

```
http://localhost:3000
```

---

## 📌 Rotas Principais

### 📁 Clientes

- `GET /clientes`
- `POST /clientes`
- `PUT /clientes/:id`
- `DELETE /clientes/:id`

### 🧑‍💼 Vendedores

- `GET /vendedores`
- `POST /vendedores`

### 🎽 Produtos

- `GET /produtos`
- `POST /produtos`
- `PUT /produtos/:id`
- `DELETE /produtos/:id`

### 🧾 Vendas

- `POST /vendas`
- `DELETE /vendas/:id`

**Exemplo de JSON para `/vendas`:**
```json
{
  "cliente_id": 1,
  "vendedor_id": 2,
  "itens": [
    { "produto_id": 1, "quantidade": 2 },
    { "produto_id": 3, "quantidade": 1 }
  ]
}
```

### 📊 Relatórios

- `GET /relatorios/mais-vendidos`
- `GET /relatorios/por-cliente`
- `GET /relatorios/consumo-medio`
- `GET /relatorios/baixo-estoque`

---

## 📎 Observações

- Ao cancelar uma venda, os itens vendidos são excluídos e o estoque é restaurado.
- Os relatórios são gerados com base nos dados agregados em tempo real.
- Todos os serviços estão configurados para responder na porta **3000**.

---

## ✨ Autor

Projeto acadêmico para a disciplina **Sistemas Distribuídos e Mobile**.  
Desenvolvido por Caique Silva com o RA de 1272322080

---

