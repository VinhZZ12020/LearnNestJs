import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseResponsitory } from '../../base.responsitory';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository extends BaseResponsitory<User> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
