import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    collection: 'users',
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  // Quan he 1 - nhieu false
  justOne: false,
});

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
