import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: DataSource) {}

  getDbHandler(): DataSource {
    return this.connection;
  }
}
