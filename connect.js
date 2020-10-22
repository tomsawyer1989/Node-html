const {Pool} = require('pg');
const keys = require('./config/keys');

const pool = new Pool ({
    connectionString: keys.posgresqlURI,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;