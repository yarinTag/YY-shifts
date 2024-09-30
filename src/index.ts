import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';

import { dataSource } from './db';
import userRouter from './routes/userRoute';
import departmentRouter from './routes/departmentRoute';
import { errorHandler } from './middlewares/error/asyncErrorHandler';
import { verifyTokenMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

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
app.use(verifyTokenMiddleware);
app.use('/user', userRouter.getRouter());
app.use('/department', departmentRouter.getRouter());
app.use(errorHandler);
