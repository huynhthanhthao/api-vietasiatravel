import { Module } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TourService } from 'src/tour/tour.service';
import { ServiceService } from 'src/service/service.service';
import { NewsService } from 'src/news/news.service';
import { ScheduleService } from 'src/schedule/schedule.service';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    AccountService,
    TourService,
    ServiceService,
    NewsService,
    ScheduleService,
  ],
})
export class UploadModule {}
