import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import client from './db';

dotenv.config();

const app = express();

// Connect to the PostgreSQL database once the app starts
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Start the Express server only after the database connection is successful
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});
