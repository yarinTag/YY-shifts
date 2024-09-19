// db.ts
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Define the database connection configuration
const client = new Client({
  user: process.env.DB_USER, // Your PostgreSQL username
  host: 'localhost', // Server host
  database: process.env.DB_NAME, // Your PostgreSQL database name
  password: process.env.DB_PASSWORD, // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

export default client;
