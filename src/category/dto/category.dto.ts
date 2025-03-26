import { PartialType } from '@nestjs/swagger';
import { RegionType, TourType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TourType)
  @IsNotEmpty()
  tourType: TourType;

  @IsOptional()
  @IsEnum(RegionType)
  regionType?: RegionType;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
