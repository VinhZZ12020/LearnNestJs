import { IsString, IsInt, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  description: string;
  content: string;
  user: string;
  categories: [string];
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: string;
  content: string;
  @IsNotEmpty()
  title: string;
}

export class FindPostDto {
  @IsMongoId() id;
}
