import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookInput } from './dto/create-book.input.dto';
import { MockType } from '../../shared/test';

describe('BooksService', () => {
  let service: BooksService;
  const bookRepositoryMock: MockType<Repository<Book>> = {
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: bookRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const bookDTO: CreateBookInput = {
        name: 'Dune',
        publishYear: 2020,
      };
      bookRepositoryMock.create?.mockReturnValue(bookDTO);
      bookRepositoryMock.save?.mockReturnValue(bookDTO);
      const newBook = await service.addBook(bookDTO);
      expect(newBook).toMatchObject(newBook);
      expect(bookRepositoryMock.create).toHaveBeenCalledWith(bookDTO);
      expect(bookRepositoryMock.save).toHaveBeenCalledWith(bookDTO);
    });
  });

  describe('findAll', () => {
    it('should find all books', async () => {
      const books: Book[] = [
        {
          id: 'ab28b2cd-bf6d-4601-a519-7f9402a72565',
          name: 'Dune',
          isLend: true,
        },
        {
          id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
          name: 'Python',
          isLend: false,
        },
      ];

      bookRepositoryMock.find?.mockReturnValue(books);
      const foundBooks = await service.findAll();
      expect(foundBooks).toContainEqual({
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
        name: 'Python',
        isLend: false,
      });
      expect(bookRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find one book', async () => {
      const book = {
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72565',
        name: 'Dune',
        isLend: true,
      };

      bookRepositoryMock.findOneOrFail?.mockReturnValue(book);
      const foundBook = await service.findOne(
        'ab28b2cd-bf6d-4601-a519-7f9402a72565',
      );
      expect(book).toMatchObject(foundBook);
      expect(bookRepositoryMock.findOneOrFail).toHaveBeenCalled();
    });
  });
});
