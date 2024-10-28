import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import HttpContext from 'express-http-context';

import { dataSource } from './db';
import { verifyTokenMiddleware } from './middlewares/authMiddleware';
import { errorHandler } from './middlewares/error/asyncErrorHandler';
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
app.use('/user', initializeRoutes.createUserRouter());
app.use(verifyTokenMiddleware);
app.use('/department', initializeRoutes.createDepartmentRouter());
app.use('/availability', initializeRoutes.createAvailabilityRouter());
app.use('/shift', initializeRoutes.createShiftRouter());
app.use('/workCycle', initializeRoutes.createWorkCycleRouter());
app.use(
  '/configuration/shift',
  initializeRoutes.createShiftConfigurationRouter()
);
app.use(
  '/configuration/workCycle',
  initializeRoutes.createWorkCycleConfigurationRouter()
);
app.use(errorHandler);
