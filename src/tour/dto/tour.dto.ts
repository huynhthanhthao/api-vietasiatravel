import { PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTourDto {
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

  @IsInt()
  price: number;

  @IsInt()
  remaining: number;

  @IsString()
  departure: string;

  @IsString()
  departureDate: string;

  @IsString()
  duration: string;

  @IsInt()
  priority: number;

  @IsString()
  categoryId: string;

  @IsString()
  vehicle: string;

  // @IsBoolean()
  // isCombo?: boolean;
}

export class UpdateTourDto extends PartialType(CreateTourDto) {}
