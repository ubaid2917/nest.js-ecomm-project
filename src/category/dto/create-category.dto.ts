import { IsString, IsEmail, IsNotEmpty, IsDefined,  IsOptional } from 'class-validator';
export class CreateCategoryDto {
  @IsDefined({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
