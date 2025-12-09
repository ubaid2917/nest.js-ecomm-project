import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator'; 
import { Role } from '../enums/role.enum';

export class LoginUserDto {
  
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

}
