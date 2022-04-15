import { Test, TestingModule } from '@nestjs/testing';
import { BooksResolver } from './books.resolver';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';
import { CreateBookInput } from './dto/create-book.input.dto';

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

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksResolver,
        {
          provide: BooksService,
          useFactory: () => ({
            findAll: jest.fn(() => books),
            findOne: jest.fn((id: string) => ({
              id,
              name: 'Python',
              isLend: false,
            })),
            addBook: jest.fn((createBookInput: CreateBookInput) => ({
              id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
              ...createBookInput,
            })),
          }),
        },
        {
          provide: UsersService,
          useFactory: () => ({
            findOne: jest.fn((ownerId) => ({
              id: ownerId,
              username: 'test',
              email: 'test@email.com',
              firstName: 'firstTest',
              lastName: 'lastTest',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('books', () => {
    it('should find and return a list books', async () => {
      const books = await resolver.books();
      expect(books).toContainEqual({
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
        name: 'Python',
        isLend: false,
      });
    });
  });

  describe('getBook', () => {
    it('should find and return a book', async () => {
      const foundBook = await resolver.getBook(
        'ab28b2cd-bf6d-4601-a519-7f9402a72566',
      );

      expect(foundBook).toMatchObject({
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
        name: 'Python',
        isLend: false,
      });
    });
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const newBook = await resolver.addBook({
        name: 'Python',
        isLend: false,
      });

      expect(newBook).toMatchObject({
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
        name: 'Python',
        isLend: false,
      });
    });
  });

  describe('owner', () => {
    it("should return book's owner", async () => {
      const book = {
        id: 'ab28b2cd-bf6d-4601-a519-7f9402a72566',
        name: 'Python',
        isLend: false,
        ownerId: '2228b2cd-bf6d-4601-a519-7f9402a72566',
      };

      const owner = await resolver.owner(book);

      expect(owner).toMatchObject({
        id: '2228b2cd-bf6d-4601-a519-7f9402a72566',
        username: 'test',
        email: 'test@email.com',
        firstName: 'firstTest',
        lastName: 'lastTest',
      });
    });
  });
});
