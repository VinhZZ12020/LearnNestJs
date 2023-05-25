import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../respositories/category.repository';
import { CreateCategoryDto } from '../dto/category.dto';
import { PostResponsitory } from '../respositories/post.respository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostResponsitory,
  ) {}

  async getAll() {
    return await this.categoryRepository.getByCondition({});
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async getPosts(category_id) {
    return await this.postRepository.getByCondition({
      categories: { $elemMatch: { $eq: category_id } },
    });
  }
}
