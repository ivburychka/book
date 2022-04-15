import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query(() => Book)
  getBook(@Args('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  addBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.booksService.addBook(createBookInput);
  }

  @ResolveField(() => User)
  owner(@Parent() book: Book): Promise<User | null> {
    return this.usersService.findOne(book.ownerId);
  }
}
