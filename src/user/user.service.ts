import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CommonQueryDto } from '../common/dto/common-query.dto';
import { PaginatedResponse } from 'src/common/interfaces/pagination.interface';
import { PaginationUtil } from 'src/utils/pagination.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(queryDto: CommonQueryDto): Promise<PaginatedResponse<User>> {
    const where = queryDto.search
      ? {
          name: ILike(`%${queryDto.search}%`),
          email: ILike(`%${queryDto.search}%`),
        }
      : {};

    return PaginationUtil.paginate(
      this.userRepository,
      queryDto.page,
      queryDto.limit,
      where,
    );
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (user) {
      const { password, ...result } = user;

      return {
        data: result,
      };
    }
    return { data: null };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
