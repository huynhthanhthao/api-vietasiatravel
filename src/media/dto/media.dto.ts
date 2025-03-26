import { MediaType } from '@prisma/client';

export class CreateMediaDto {
  mediaUrl: string[];

  mediaType: MediaType;
}
