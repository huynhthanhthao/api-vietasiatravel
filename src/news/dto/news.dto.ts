import { NewsType } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  subContent?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  priority?: number = 0;

  type: NewsType;
}

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  subContent?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  @IsOptional()
  priority?: number = 0;

  @IsOptional()
  type?: NewsType;
}
