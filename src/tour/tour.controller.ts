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
import { RegionType, TourType } from '@prisma/client';
import { TourService } from './tour.service';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { CreateTourDto, UpdateTourDto } from './dto/tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get('/detail/:slug')
  async getTour(@Param('slug') slug: string) {
    return await this.tourService.getTour(slug);
  }

  @Get()
  async getTours(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('categories') categories?: string | string[],
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('tourType') tourType?: TourType | null,
    @Query('regionType') regionType?: RegionType | null,
    @Query('isCombo') isCombo?: number | null,
  ) {
    let categoryNamesArray: string[] | undefined;
    if (typeof categories === 'string') {
      categoryNamesArray = [categories];
    } else {
      categoryNamesArray = categories;
    }
    return this.tourService.getTours({
      search,
      sort,
      tourType,
      regionType,
      categories: categoryNamesArray,
      page: Number(page),
      pageSize: Number(pageSize),
      isCombo: isCombo && Boolean(+isCombo),
    });
  }

  @Post()
  @UseJwtGuard()
  create(@Body() request: CreateTourDto, @GetUser() user: any) {
    return this.tourService.createTour(user.userId, request);
  }

  @Put(':id')
  @UseJwtGuard()
  update(
    @Param('id') id: string,
    @Body() request: UpdateTourDto,
    @GetUser() user: any,
  ) {
    return this.tourService.updateTour(user.userId, id, request);
  }

  @Delete(':id')
  @UseJwtGuard()
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.tourService.deleteTour(user.userId, id);
  }
}
