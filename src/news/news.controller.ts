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
import { NewsType } from '@prisma/client';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/detail/:slug')
  async getTour(@Param('slug') slug: string) {
    return await this.newsService.getNews(slug);
  }

  @Get()
  async getNews(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('newsType') newsType?: NewsType | null,
  ) {
    return this.newsService.getListNews({
      search,
      sort,
      newsType,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Post()
  @UseJwtGuard()
  create(@Body() request: CreateNewsDto, @GetUser() user: any) {
    return this.newsService.createNews(user.userId, request);
  }

  @Put(':id')
  @UseJwtGuard()
  update(
    @Param('id') id: string,
    @Body() request: UpdateNewsDto,
    @GetUser() user: any,
  ) {
    return this.newsService.updateNews(user.userId, id, request);
  }

  @Delete(':id')
  @UseJwtGuard()
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.newsService.deleteNews(user.userId, id);
  }
}
