import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './local.authentication.guard';
import { RequestWithUser } from './models/request-with-user.interface';
import { TokenInterface } from './models/token.interface';
import { User } from '../users/entities/user.entity';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser): Promise<{
    user: User;
    token: TokenInterface;
  }> {
    const { user } = request;
    const token = this.authService.getToken(user);
    user.password = undefined;
    return {
      user,
      token,
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  async checkJwt(@Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    user.password = undefined;
    return user;
  }
}
