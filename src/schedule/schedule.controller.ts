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
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/detail/:slug')
  async getTour(@Param('slug') slug: string) {
    return await this.scheduleService.getSchedule(slug);
  }

  @Get()
  async getSchedules(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('scheduleType') scheduleType?: TourType | null,
  ) {
    return this.scheduleService.getSchedules({
      search,
      sort,
      scheduleType,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Post()
  @UseJwtGuard()
  create(@Body() request: CreateScheduleDto, @GetUser() user: any) {
    return this.scheduleService.createSchedule(user.userId, request);
  }

  @Put(':id')
  @UseJwtGuard()
  update(
    @Param('id') id: string,
    @Body() request: UpdateScheduleDto,
    @GetUser() user: any,
  ) {
    return this.scheduleService.updateSchedule(user.userId, id, request);
  }

  @Delete(':id')
  @UseJwtGuard()
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.scheduleService.deleteSchedule(user.userId, id);
  }
}
