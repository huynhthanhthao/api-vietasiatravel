import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { CreateMediaDto } from './dto/media.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getAll() {
    return await this.mediaService.getAll();
  }

  @Post()
  @UseJwtGuard()
  create(@Body() request: CreateMediaDto, @GetUser() user: any) {
    return this.mediaService.createMedia(user.userId, request);
  }

  @Delete()
  @UseJwtGuard()
  update(@Body('mediaUrl') mediaUrl: string) {
    return this.mediaService.deleteMedia(mediaUrl);
  }
}
