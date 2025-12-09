import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator'; 
import { Role } from '../enums/role.enum';

export class RegisterUserDto {
  @IsDefined({ message: 'Name is required' })
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsDefined({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string (e.g., user/admin)' })
  @IsNotEmpty({ message: 'Role cannot be empty' })
  role: Role;
}
