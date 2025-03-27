import { ServiceType } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
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
  price?: number = 0;

  @IsOptional()
  priority?: number = 0;

  serviceType: ServiceType;

  unit: string;
}

export class UpdateServiceDto {
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
  priority?: number = 0;

  @IsOptional()
  price?: number = 0;

  @IsOptional()
  serviceType?: ServiceType;
}
