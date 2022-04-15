import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { join } from 'path';
import dbConfig from '../../ormconfig';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('POSTGRES_HOST'),
      //   port: Number.parseInt(configService.get('POSTGRES_PORT') || '5432', 10),
      //   username: configService.get('POSTGRES_USER'),
      //   password: configService.get('POSTGRES_PASSWORD'),
      //   database: configService.get('POSTGRES_DATABASE'),
      //   migrations: [join(__dirname, './migrations', '*{.ts,.js}')],
      //   entities: [join(__dirname, 'app', '**/*.entity{.ts,.js}')],
      //   synchronize: false,
      //   migrationsRun: false,
      //   uuidExtension: 'uuid-ossp',
      //   migrationsTableName: 'migrations',
      // }),
      useFactory: (configService: ConfigService) =>
        new DataSource(dbConfig(configService)).options,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   ...dbConfig.options,
    // }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
