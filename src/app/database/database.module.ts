import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig.options,
    }),
    // TypeOrmModule.forRoot({
    //   ...dbConfig.options,
    // }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
