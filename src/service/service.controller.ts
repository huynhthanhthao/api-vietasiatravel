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
import { ServiceType } from '@prisma/client';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/detail/:slug')
  async getTour(@Param('slug') slug: string) {
    return await this.serviceService.getService(slug);
  }

  @Get('')
  async getService(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('serviceType') serviceType?: ServiceType | null,
  ) {
    return this.serviceService.getServices({
      search,
      sort,
      serviceType,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Post()
  @UseJwtGuard()
  create(@Body() request: CreateServiceDto, @GetUser() user: any) {
    return this.serviceService.createService(user.userId, request);
  }

  @Put(':id')
  @UseJwtGuard()
  update(
    @Param('id') id: string,
    @Body() request: UpdateServiceDto,
    @GetUser() user: any,
  ) {
    return this.serviceService.updateService(user.userId, id, request);
  }

  @Delete(':id')
  @UseJwtGuard()
  delete(@Param('id') id: string, @GetUser() user: any) {
    return this.serviceService.deleteService(user.userId, id);
  }
}
