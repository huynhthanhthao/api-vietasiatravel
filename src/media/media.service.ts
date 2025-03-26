import { Injectable } from '@nestjs/common';
import { MediaType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateMediaDto } from './dto/media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const media = await this.prisma.media.findMany();

    return {
      images:
        media
          .filter((item) => item.mediaType == MediaType.IMAGE)
          .map((item) => item.mediaUrl) || [],
      videos:
        media
          .filter((item) => item.mediaType == MediaType.VIDEO)
          .map((item) => item.mediaUrl) || [],
    };
  }

  async createMedia(id: string, request: CreateMediaDto) {
    const successfulUrls: string[] = [];
    const duplicateUrls: string[] = [];

    for (const item of request.mediaUrl) {
      const existingMedia = await this.prisma.media.findUnique({
        where: { mediaUrl: item },
      });

      if (existingMedia) {
        duplicateUrls.push(item);
      } else {
        await this.prisma.media.create({
          data: {
            mediaType: request.mediaType,
            mediaUrl: item,
            createdById: id,
          },
        });
        successfulUrls.push(item);
      }
    }

    return {
      successfulUrls,
      duplicateUrls,
    };
  }

  async deleteMedia(mediaUrl: string) {
    return await this.prisma.media.delete({
      where: { mediaUrl },
    });
  }
}
