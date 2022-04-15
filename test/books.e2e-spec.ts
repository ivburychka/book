import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { DataSource } from 'typeorm';
import { DatabaseService } from '../src/app/database/database.service';
import { Book } from '../src/app/books/book.entity';
import { booksStub } from './stubs/booksStub';

describe('Books (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let dbService: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dbService = moduleFixture.get<DatabaseService>(DatabaseService);
    dbConnection = dbService.getDbHandler();
    !dbConnection.isInitialized && (await dbConnection.initialize());
  });

  afterAll(async () => {
    await dbConnection.getRepository(Book).delete({});
    await app.close();
  });

  // beforeEach(async () => {
  //   await dbConnection.getRepository(Book).delete({});
  // });

  const gql = '/graphql';

  describe('books', () => {
    afterAll(async () => {
      await dbConnection.getRepository(Book).clear();
    });

    it('should return all books', async () => {
      await dbConnection.getRepository(Book).insert(booksStub());

      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
            query Books {
                books {
                  id
                  name
                  isLend
                  publishYear
                }
              }
            `,
        });

      expect(response.status).toEqual(200);
      const books: Book[] = response.body.data.books;
      expect(books.length).toEqual(2);
      expect(books).toMatchObject(booksStub());
    });
  });

  describe('getBook', () => {
    let foundBook: Book | null;
    beforeAll(async () => {
      await dbConnection.getRepository(Book).insert(booksStub());
      foundBook = await dbConnection
        .getRepository(Book)
        .findOne({ where: { name: booksStub()[0].name } });
    });

    it('should return the book if exists', async () => {
      expect(foundBook).not.toBeFalsy();

      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
            query GetBook($getBookId: String!) {
              getBook(id: $getBookId) {
              id
            }
          }
          `,
          variables: `
            {
              "getBookId": "${foundBook?.id}"
            }
          `,
        });

      expect(response.status).toEqual(200);
      const book: Book = response.body.data.getBook;

      expect(book.id).toEqual(foundBook?.id);
    });

    it("should return error if book doesn't exist", async () => {
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
            query GetBook($getBookId: String!) {
              getBook(id: $getBookId) {
              id
            }
          }
          `,
          variables: `
            {
              "getBookId": "00000000-0000-0000-0000-000000000002"
            }
          `,
        });

      expect(response.status).toEqual(200);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe('addBook', () => {
    const createBookRequest: Partial<Book> = {
      name: 'New Challenges',
      publishYear: 2012,
    };

    it('should add a new book', async () => {
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
             mutation AddBook($createBookInput: CreateBookInput!) {
              addBook(createBookInput: $createBookInput) {
                id
                name
                isLend
                publishYear
              }
            }
          `,
          variables: `
            {
              "createBookInput": {
                "name": "${createBookRequest.name}",
                "publishYear": ${createBookRequest.publishYear}
              }
            }
          `,
        });

      expect(response.status).toEqual(200);
      const newBook: Book = response.body.data.addBook;

      expect(newBook).toMatchObject(createBookRequest);

      const foundBook = await dbConnection.getRepository(Book).findOne({
        where: {
          name: createBookRequest.name,
        },
      });

      expect(foundBook).toMatchObject(createBookRequest);
    });
  });
});
