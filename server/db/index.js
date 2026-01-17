const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function initDb() {
    const migrationPath = path.join(__dirname, 'migrations', '001_submissions.sql');
    const migration = fs.readFileSync(migrationPath, 'utf8');
    await pool.query(migration);
}

async function query(text, params) {
    return pool.query(text, params);
}

async function getClient() {
    return pool.connect();
}

module.exports = {
    pool,
    query,
    getClient,
    initDb,
};
