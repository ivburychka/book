import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepo.create(createUserInput);

    return await this.userRepo.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  findOne(id?: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }
}
