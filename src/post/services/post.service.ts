import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePostDto, CreatePostDto } from '../dto/post.dto';
// import { Post } from '../post.interface';

import { PostResponsitory } from '../respositories/post.respository';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { User } from 'src/user/models/user.model';
import { CategoryRepository } from '../respositories/category.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postResponsitory: PostResponsitory,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPost() {
    return this.postResponsitory.getByCondition({});
  }

  // updatePost(id: number, post: UpdatePostDto) {
  //     const postIndex = this.posts.findIndex(post => post.id === id);
  //     if(postIndex > -1) {
  //         this.posts[postIndex] = post;
  //         return post;
  //     }
  //     else{
  //         throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  //     }
  // }

  async getPostById(post_id: string) {
    const post = await this.postResponsitory.findById(post_id);
    if (post) {
      await post.populate({ path: 'user', select: '-password' });
      return post;
    } else {
      throw new NotFoundException(`Post with id ${post_id} not found`);
    }
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return this.postResponsitory.findByIdAndUpdate(post_id, data);
  }

  async deletePost(post_id: string) {
    return await this.postResponsitory.deleteOne(post_id);
  }

  async createPost(user: User, post: CreatePostDto) {
    post.user = user._id;
    const new_post = await this.postResponsitory.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: { posts: new_post._id },
        },
      );
    }
    return new_post;
  }
  async getByCategory(category_id: string) {
    return await this.postResponsitory.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postResponsitory.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }
}
