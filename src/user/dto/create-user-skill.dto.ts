import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSkillsDto {
  @IsString()
  @IsNotEmpty()
  skill: string;

}
