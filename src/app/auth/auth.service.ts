import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { TokenInterface } from './models/token.interface';
import { JwtPayloadInterface } from './models/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new BadRequestException("Can't register user");
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await AuthService.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword?: string,
  ) {
    if (!hashedPassword) {
      throw new BadRequestException('Wrong credentials provided');
    }
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getToken(user: User): TokenInterface {
    const payload: JwtPayloadInterface = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<User | null> {
    // const decoded: JwtPayloadInterface = await this.jwtService.verify(token);
    console.log(token);
    return await this.usersService.getUserByEmail('decoded.email');
  }
}
