import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserEducation } from './entities/user-education.entity';
import { UserSkill } from './entities/user-skills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    UserEducation,
    UserSkill
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
