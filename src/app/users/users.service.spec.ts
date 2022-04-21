import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MockType } from '../../shared/test';
import { CreateUserInput } from './dto/create-user.input';

// TODO: Testing the customer resolver

describe('UsersService', () => {
  let service: UsersService;
  const userRepositoryMock: MockType<Repository<User>> = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const createUserInput: CreateUserInput = {
        username: 'test',
        email: 'test@email.com',
        firstName: 'firstTest',
        lastName: 'lastTest',
        password: 'q1w2e3r4',
      };

      userRepositoryMock.create?.mockReturnValue(createUserInput);
      userRepositoryMock.save?.mockReturnValue(createUserInput);

      const createdUser = await service.create(createUserInput);

      expect(createdUser).toMatchObject(createUserInput);
    });
  });
});
