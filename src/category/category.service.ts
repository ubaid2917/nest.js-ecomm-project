import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CommonQueryDto } from '../common/dto/common-query.dto';
import { PaginatedResponse } from 'src/common/interfaces/pagination.interface';
import { PaginationUtil } from 'src/utils/pagination.utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const isAlreadyExist = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (isAlreadyExist) {
      throw new BadRequestException('Category with this name already exists');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(
    search?: string,
    page?: string,
    limit?: string,
  ): Promise<PaginatedResponse<Category>> {
    const where = search ? { name: ILike(`%${search}%`) } : {};

    return PaginationUtil.paginate(this.categoryRepository, page, limit, where);
  }

 async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });   
    
    return {
      data: category,
    };
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
