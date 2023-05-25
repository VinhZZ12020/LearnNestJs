import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './services/post.service';
import { PostSchema } from './models/post.models';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResponsitory } from './respositories/post.respository';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './respositories/category.repository';
import { CategoryController } from './category.controller';
import { CategorySchema } from './models/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [PostController, CategoryController],
  providers: [
    PostService,
    CategoryService,
    PostResponsitory,
    CategoryRepository,
  ],
})
export class PostModule {}
