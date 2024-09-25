import express from 'express';
import dotenv from 'dotenv';
import { dataSource } from './db';
import userRoute from './routes/userRoute';
import departmentRoute from './routes/departmentRoute';

dotenv.config();

const app = express();
app.use(express.json());

dataSource
  .initialize()
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

app.use(userRoute);
app.use('/departments', departmentRoute);
