import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NewsService } from 'src/news/news.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ServiceService } from 'src/service/service.service';
import { TourService } from 'src/tour/tour.service';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { prependHostAndPort } from 'src/utils/getThumbnail';
import { GetUser } from 'src/utils/user';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly configService: ConfigService,
    private readonly tourService: TourService,
    private readonly serService: ServiceService,
    private readonly newsService: NewsService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @Post()
  @UseJwtGuard()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const filePath = `/uploads/images/${file.filename}`;
    return prependHostAndPort(this.configService, filePath);
  }

  @Post('/uploadTourThumbnail')
  @UseJwtGuard()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadTourThumbnail(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any,
  ) {
    const filePath = prependHostAndPort(
      this.configService,
      `/uploads/images/${file.filename}`,
    );
    return this.tourService.updateTour(user.userId, body.id, {
      thumbnail: filePath,
    });
  }

  @Post('/uploadServiceThumbnail')
  @UseJwtGuard()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadServiceThumbnail(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any,
  ) {
    const filePath = prependHostAndPort(
      this.configService,
      `/uploads/images/${file.filename}`,
    );
    return this.serService.updateService(user.userId, body.id, {
      thumbnail: filePath,
    });
  }

  @Post('/uploadNewsThumbnail')
  @UseJwtGuard()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadNewsThumbnail(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any,
  ) {
    const filePath = prependHostAndPort(
      this.configService,
      `/uploads/images/${file.filename}`,
    );
    return this.newsService.updateNews(user.userId, body.id, {
      thumbnail: filePath,
    });
  }

  @Post('/uploadScheduleThumbnail')
  @UseJwtGuard()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadScheduleThumbnail(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: any,
  ) {
    const filePath = prependHostAndPort(
      this.configService,
      `/uploads/images/${file.filename}`,
    );
    return this.scheduleService.updateSchedule(user.userId, body.id, {
      thumbnail: filePath,
    });
  }

  @Post('images')
  @UseJwtGuard()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `images-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadProductImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const filepaths = files.map((file) =>
      prependHostAndPort(
        this.configService,
        `/uploads/images/${file.filename}`,
      ),
    );
    return filepaths;
  }
}
