require('dotenv').config();
const { Pool } = require('pg');

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.APP_USER,
    database: process.env.DATABASE,
    password: process.env.APP_PASS,
    port: process.env.DB_PORT
});