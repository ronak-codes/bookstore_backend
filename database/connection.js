const { Pool } = require("pg");
const dotenv= require("dotenv");
dotenv.config();

const pool = new Pool({
    user:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE_NAME,
    ssl:{
        rejectUnauthorized:false
    }

})

pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL database:', err);
});

module.exports = { 
    pool
}