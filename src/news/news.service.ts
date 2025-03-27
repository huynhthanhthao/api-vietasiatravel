import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { normalizeString } from 'src/utils/translate';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNews(userId: string, request: CreateNewsDto) {
    const data = {
      ...request,
      searchTitle: normalizeString(request.title),
      createdById: userId,
      updatedById: userId,
    };

    return await this.prisma.news.create({
      data,
    });
  }

  async updateNews(userId: string, id: string, request: UpdateNewsDto) {
    return await this.prisma.news.update({
      where: {
        id,
      },
      data: {
        ...request,
        ...(request.title && { searchTitle: normalizeString(request.title) }),
        updatedById: userId,
      },
    });
  }

  async deleteNews(userId: string, id: string) {
    return await this.prisma.news.update({
      where: { id },
      data: {
        updatedById: userId,
        isDeleted: true,
      },
    });
  }

  async getListNews({ search, sort, newsType, page = 1, pageSize = 10 }) {
    let whereConditions: any = { isDeleted: false };

    if (search) {
      whereConditions = {
        ...whereConditions,
        OR: [
          {
            searchTitle: {
              contains: normalizeString(search),
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (newsType) {
      whereConditions = {
        ...whereConditions,
        type: newsType,
      };
    }

    const sortCriteria = [];
    if (sort === 'date') {
      sortCriteria.push({ createdAt: 'desc' });
    } else {
      sortCriteria.push({ priority: 'desc' });
      sortCriteria.push({ createdAt: 'desc' });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const news = await this.prisma.news.findMany({
      where: whereConditions,
      select: {
        id: true,
        slug: true,
        title: true,
        thumbnail: true,
        subContent: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: sortCriteria,
      skip,
      take,
    });

    const totalCount = await this.prisma.news.count({
      where: whereConditions,
    });

    return {
      news,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }

  async getNews(slug: string) {
    return await this.prisma.news.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        createdBy: {
          select: {
            email: true,
          },
        },
        updatedBy: {
          select: {
            email: true,
          },
        },
      },
    });
  }
}
