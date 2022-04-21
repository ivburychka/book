import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookRepo.findOneOrFail({ where: { id } });
  }

  async findByISBN(id: string): Promise<Book> {

    // 9786171276895

    // 1. https://isbndb.com/apidocs/v2
    // 5,000 daily calls 10$ month

    // https://www.vinzius.com/post/free-and-paid-api-isbn/
    // https://developers.google.com/books/docs/overview

    // https://www.bbvaapimarket.com/en/api-world/apis-books-amazon-google-books-isbn-and-their-open-apis/


    return this.bookRepo.findOneOrFail({ where: { id } });
  }

  async addBook(createBookInput: CreateBookInput): Promise<Book> {
    const newBook = this.bookRepo.create(createBookInput);

    return this.bookRepo.save(newBook);
  }
}
