import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();

const dbConfig: (configService: ConfigService) => PostgresConnectionOptions = (
  configService: ConfigService,
) => {
  const isTestEnv = configService.get('NODE_ENV') === 'test';

  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: Number.parseInt(configService.get('POSTGRES_PORT') || '5432', 10),
    username: isTestEnv
      ? configService.get('TEST_POSTGRES_USER')
      : configService.get('POSTGRES_USER'),
    password: isTestEnv
      ? configService.get('TEST_POSTGRES_PASSWORD')
      : configService.get('POSTGRES_PASSWORD'),
    database: isTestEnv
      ? configService.get('TEST_POSTGRES_DATABASE')
      : configService.get('POSTGRES_DATABASE'),
    migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
    entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
    synchronize: false,
    migrationsRun: isTestEnv,
    uuidExtension: 'uuid-ossp',
    migrationsTableName: 'migrations',
  };

  // development: {
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
  // },
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

// const config: Record<string, PostgresConnectionOptions> = {
//   development: {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'api-user',
//     password: 'mysecretpassword',
//     database: 'book-db',
//     migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
//     entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
//     synchronize: false,
//     migrationsRun: false,
//     uuidExtension: 'uuid-ossp',
//     migrationsTableName: 'migrations',
//   },
//   test: {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'api-user',
//     password: 'mysecretpassword',
//     // database: 'test-db',
//     database: 'book-db',
//     migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
//     entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
//     synchronize: true,
//     dropSchema: true,
//     migrationsRun: false,
//     uuidExtension: 'uuid-ossp',
//   },
// };

// export default new DataSource(config()[process.env.NODE_ENV!]);
export default dbConfig;
