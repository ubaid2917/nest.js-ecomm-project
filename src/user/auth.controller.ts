import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginResponse } from './constants/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {} 

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return await this.AuthService.register(registerUserDto);
  }
  
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.AuthService.login(loginUserDto);
  } 

  
}
