const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'loja_esportiva',
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect()
};
