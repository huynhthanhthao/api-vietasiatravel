import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('title') title: string,
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('content') content: string,
  ) {
    await this.emailService.sendMail(title, fullName, email, content);
    return 'Email sent!';
  }

  @Post('tour')
  async sendEmailTour(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('preferDestinate') preferDestinate: string,
    @Body('traveler') traveler: number,
    @Body('tourType') tourType: string,
    @Body('duration') duration: string,
    @Body('startDate') startDate: string,
    @Body('comment') comment: string,
  ) {
    await this.emailService.sendMailTour(
      fullName,
      email,
      preferDestinate,
      traveler,
      tourType,
      duration,
      startDate,
      comment,
    );
    return 'Email sent!';
  }
}
