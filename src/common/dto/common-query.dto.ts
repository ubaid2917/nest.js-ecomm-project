import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class CommonQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value || '10')
  limit?: string = '10';

  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value || '1')
  page?: string = '1';
}