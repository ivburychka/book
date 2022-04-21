import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAuthorInput } from './dto/find-author.input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}

  async create(
    createAuthorInput: CreateAuthorInput,
    user: User,
  ): Promise<Author> {
    const author = this.authorRepo.create({
      createBy: user.id,
      ...createAuthorInput,
    });
    await this.authorRepo.save(author);

    return author;
  }

  findAll(): Promise<Author[]> {
    return this.authorRepo.find();
  }

  async findOne(params: FindAuthorInput): Promise<Author | null> {
    const book = await this.authorRepo.findOneBy(params);
    if (!book) {
      throw new NotFoundException('Author not found');
    }
    return book;
  }

  async update(
    id: string,
    updateAuthorInput: UpdateAuthorInput,
    user: User,
  ): Promise<Author> {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (author.createBy === user.id) {
      throw new ForbiddenException("You can't update author");
    }

    await this.authorRepo.update(author.id, {
      ...author,
      ...updateAuthorInput,
    });

    return (await this.findOne({ id: author.id }))!;
  }
}
