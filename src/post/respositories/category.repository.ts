import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../models/post.models';
import { BaseResponsitory } from '../../base.responsitory';

@Injectable()
export class CategoryRepository extends BaseResponsitory<Post> {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Post>,
  ) {
    super(categoryModel);
  }
}
