
# Loja de Roupas Esportivas — Projeto de Sistemas Distribuídos e Mobile

Este projeto simula uma rede de lojas de roupas esportivas, utilizando arquitetura de microsserviços com serviços distribuídos em contêineres Docker. Ele foi desenvolvido como parte da disciplina de **Sistemas Distribuídos e Mobile**.

## 📦 Estrutura dos Serviços

- `clientes-service`: CRUD de clientes
- `vendedores-service`: CRUD de vendedores
- `produtos-service`: Cadastro de produtos e controle de estoque
- `vendas-service`: Processamento de pedidos de venda e cancelamento
- `relatorios-service`: Geração de relatórios analíticos (produtos mais vendidos, consumo por cliente, etc.)

Todos os serviços se comunicam via APIs REST e utilizam um banco de dados relacional PostgreSQL compartilhado.

---

## 🚀 Como Executar

### ✅ Pré-requisitos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### ▶️ Subindo o projeto

1. Clone o repositório:
   ```bash
   git clone <URL-do-repositório>
   cd <nome-da-pasta>
   ```

2. Suba os containers:
   ```bash
   docker-compose up --build
   ```

> Os serviços serão iniciados automaticamente e o banco será populado com dados iniciais.

---

## 🌐 Portas Utilizadas

| Serviço              | Porta |
|----------------------|-------|
| clientes-service     | 3001  |
| vendedores-service   | 3002  |
| produtos-service     | 3000  |
| vendas-service       | 3003  |
| relatorios-service   | 3004  |
| PostgreSQL (interno) | 5432  |

---

## 🧪 Teste dos Endpoints

Você pode usar o [Postman](https://www.postman.com/) ou o `curl` para testar os serviços. Os principais endpoints são:

### 📦 Produtos
- `GET /produtos` — Lista todos os produtos
- `POST /produtos` — Adiciona novo produto

### 🛒 Vendas
- `POST /vendas` — Registra uma nova venda
- `DELETE /vendas/:id` — Cancela uma venda e atualiza o estoque

### 📈 Relatórios
- `GET /relatorios/mais-vendidos`
- `GET /relatorios/por-cliente/:id`
- `GET /relatorios/consumo-medio`
- `GET /relatorios/baixo-estoque`

---

## 📚 Relatório

O relatório final do projeto está disponível na pasta `/relatório/relatorio-final.pdf` e detalha todas as etapas de implementação, tecnologias utilizadas, modelagem de dados e resultados obtidos.

---

## 👨‍💻 Autor

Projeto desenvolvido por [Seu Nome] como atividade prática da disciplina de Sistemas Distribuídos e Mobile.
