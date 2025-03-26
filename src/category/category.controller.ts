import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TourType } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('categories')
  async getVietNamTour() {
    const [vietnamCategories, globalCategories] = await Promise.all([
      this.categoryService.getCategories(TourType.VIETNAMTOUR),
      this.categoryService.getCategories(TourType.GLOBALTOUR),
    ]);

    return {
      categories: {
        vietnamTour: vietnamCategories,
        globalTour: globalCategories,
      },
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.categoryService.getCategory(id);
  }

  @Get()
  async getCategories(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('tourType') tourType?: TourType | null,
  ) {
    return this.categoryService.getListCategories({
      search,
      sort,
      tourType,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Post()
  async createCategory(@Body() request: CreateCategoryDto) {
    return await this.categoryService.createCategory(request);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() request: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, request);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
