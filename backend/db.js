const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'popmap_db',
    password: 'Koalabear2005!?',
    port: 5432,
});

module.exports = pool;