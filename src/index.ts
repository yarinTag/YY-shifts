import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import client from './db';

dotenv.config();

const app = express();

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
