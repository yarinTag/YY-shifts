import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import HttpContext from 'express-http-context';

import { dataSource } from './db';
import userRouter from './routes/userRoute';
import shiftRoute from './routes/shiftRoute';
import departmentRouter from './routes/departmentRoute';
import availabilityRoute from './routes/availabilityRoute';
import { verifyTokenMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/error/asyncErrorHandler';
import workCycleConfigurationRoute from './routes/workCycleConfigurationRoute';
import { Initialize } from './initaliztion';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(HttpContext.middleware);
const initializeRoutes = new Initialize();

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
app.use('/user', userRouter);
app.use(verifyTokenMiddleware);
app.use('/department', departmentRouter);
app.use('/availability', availabilityRoute);
app.use('/shift', shiftRoute);
app.use('/workCycle', initializeRoutes.createWorkCycleRouter());
app.use(
  '/configuration/shift',
  initializeRoutes.createShiftConfigurationRouter()
);
app.use('/configuration/workCycle', workCycleConfigurationRoute);
app.use(errorHandler);
