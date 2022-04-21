import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

const dbConfig: () => PostgresConnectionOptions = () => {
  const isTestEnv = process.env.NODE_ENV === 'test';

  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? Number.parseInt(process.env.POSTGRES_PORT, 10) : 5432,
    username: isTestEnv
      ? process.env.TEST_POSTGRES_USER
      : process.env.POSTGRES_USER,
    password: isTestEnv
      ? process.env.TEST_POSTGRES_PASSWORD
      : process.env.POSTGRES_PASSWORD,
    database: isTestEnv
      ? process.env.TEST_POSTGRES_DATABASE
      : process.env.POSTGRES_DATABASE,
    migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
    entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
    synchronize: false,
    migrationsRun: isTestEnv,
    uuidExtension: 'uuid-ossp',
    migrationsTableName: 'migrations',
  };

  // return {
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'api-user',
  //   password: 'mysecretpassword',
  //   database: 'book-db',
  //   migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
  //   entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
  //   synchronize: false,
  //   migrationsRun: false,
  //   uuidExtension: 'uuid-ossp',
  //   migrationsTableName: 'migrations',
  // };
  // test: {
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'api-user',
  //   password: 'mysecretpassword',
  //   // database: 'test-db',
  //   database: 'book-db',
  //   migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
  //   entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
  //   synchronize: true,
  //   dropSchema: true,
  //   migrationsRun: false,
  //   uuidExtension: 'uuid-ossp',
  // },
};

export default new DataSource(dbConfig());
