import { FindManyOptions, Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import {
  PaginatedResponse,
  PaginationMeta,
} from '../common/interfaces/pagination.interface';

export class PaginationUtil {
  static async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    page: string = '1',
    limit: string = '10',
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: string[],
  ): Promise<PaginatedResponse<T>> {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const options: FindManyOptions<T> = {
      where,
      skip,
      take: limitNum,
      ...(relations && { relations }),
    };

    const [data, total] = await repository.findAndCount(options);

    const meta: PaginationMeta = {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };

    return {
      success: true,
      data,
      ...meta,
    };
  }
}
