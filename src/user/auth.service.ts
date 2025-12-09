import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { hashPassword, comparePassword } from './constants/password.constant';
import {
  generateAccessToken,
  generateRefreshToken,
} from './constants/auth.constant';
import { LoginResponse } from './constants/login.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<Omit<User, 'password'>> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });

    if (isUserExist) {
      throw new BadRequestException('User with this email already exists');
    }

    registerUserDto.password = await hashPassword(registerUserDto.password);
    const user = this.userRepository.create(registerUserDto);
    const savedUser = await this.userRepository.save(user);

    const { password, ...result } = savedUser;
    return result;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...userData } = user;

    const payload = { userId: user.id, email: user.email };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return {
      user: userData,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }   
}
