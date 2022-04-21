import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import { FindAuthorInput } from './dto/find-author.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  authorCreate(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
    @GetUser() user: User,
  ) {
    return this.authorsService.create(createAuthorInput, user);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author', nullable: true })
  findOne(@Args('findAuthorInput') findAuthorInput: FindAuthorInput) {
    return this.authorsService.findOne(findAuthorInput);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
    @GetUser() user: User,
  ) {
    return this.authorsService.update(
      updateAuthorInput.id,
      updateAuthorInput,
      user,
    );
  }
}
