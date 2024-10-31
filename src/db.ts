import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ShiftSubscriber } from './modules/shifts/shift.subscriber';
import { WorkCycleSubscriber } from './modules/workCycle/workCycle.subscriber';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.schema{.js,.ts}'],
  subscribers: [ShiftSubscriber, WorkCycleSubscriber],
  logging: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
