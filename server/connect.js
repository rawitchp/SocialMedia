import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// export const db = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'Mixmix13.',
//   database: 'social',
// });

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// export const db = mysql.createConnection(process.env.DATABASE_URL);
