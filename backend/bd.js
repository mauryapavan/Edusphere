
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  port: parseInt(process.env.db_port),
  waitForConnections: true,
  connectionLimit: 3,  // Keep this low for free MySQL hosting
  queueLimit: 0,
});

export default pool;