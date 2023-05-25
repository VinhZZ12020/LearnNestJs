import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponsitory } from 'src/base.responsitory';
import { Post } from '../models/post.models';

@Injectable()
export class PostResponsitory extends BaseResponsitory<Post> {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    super(postModel);
  }
}
