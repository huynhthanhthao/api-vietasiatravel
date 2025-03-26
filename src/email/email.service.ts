import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(
    title: string,
    fullName: string,
    email: string,
    content: string,
  ) {
    try {
      const toEmail = this.configService.get<string>('TO_EMAIL');
      await this.mailerService.sendMail({
        to: email,
        subject: '[VietAsia Travel] Xác nhận yêu cầu hỗ trợ "' + title + '"',
        template: './contact-user',
        context: {
          title,
          fullName,
          email,
          content,
          domain: this.configService.get<string>('DOMAIN'),
          logo: this.configService.get<string>('LOGO'),
        },
      });
      await this.mailerService.sendMail({
        to: toEmail,
        subject: '[VietAsia Travel] Hỗ trợ "' + title + '"',
        template: './contact-admin',
        context: {
          title,
          fullName,
          email,
          content,
          domain: this.configService.get<string>('DOMAIN'),
          logo: this.configService.get<string>('LOGO'),
        },
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendMailTour(
    fullName: string,
    email: string,
    preferDestinate: string,
    traveler: number,
    tourType: string,
    duration: string,
    startDate: string,
    comment: string,
  ) {
    try {
      const toEmail = this.configService.get<string>('TO_EMAIL');
      await this.mailerService.sendMail({
        to: email,
        subject:
          '[VietAsia Travel] Xác nhận yêu cầu tư vấn tour "' +
          preferDestinate +
          "'",
        template: './tour-user',
        context: {
          fullName,
          email,
          traveler,
          tourType,
          duration,
          startDate,
          comment,
          preferDestinate,
          domain: this.configService.get<string>('DOMAIN'),
          logo: this.configService.get<string>('LOGO'),
        },
      });
      await this.mailerService.sendMail({
        to: toEmail,
        subject: '[VietAsia Travel] Tư vấn tour "' + preferDestinate + '"',
        template: './tour-admin',
        context: {
          traveler,
          tourType,
          duration,
          startDate,
          comment,
          fullName,
          email,
          preferDestinate,
          domain: this.configService.get<string>('DOMAIN'),
          logo: this.configService.get<string>('LOGO'),
        },
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
