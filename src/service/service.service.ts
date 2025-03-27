import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { normalizeString } from 'src/utils/translate';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async createService(userId: string, request: CreateServiceDto) {
    const data = {
      ...request,
      searchTitle: normalizeString(request.title),
      createdById: userId,
      updatedById: userId,
    };

    return await this.prisma.service.create({
      data,
    });
  }

  async updateService(userId: string, id: string, request: UpdateServiceDto) {
    return await this.prisma.service.update({
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

  async deleteService(userId: string, id: string) {
    return await this.prisma.service.update({
      where: { id },
      data: {
        updatedById: userId,
        isDeleted: true,
      },
    });
  }

  async getServices({ search, sort, serviceType, page = 1, pageSize = 10 }) {
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

    if (serviceType) {
      whereConditions = {
        ...whereConditions,
        serviceType: serviceType,
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

    const services = await this.prisma.service.findMany({
      where: whereConditions,
      select: {
        id: true,
        slug: true,
        title: true,
        thumbnail: true,
        subContent: true,
        serviceType: true,
        price: true,
        priority: true,
        createdAt: true,
      },
      orderBy: sortCriteria,
      skip,
      take,
    });

    const totalCount = await this.prisma.service.count({
      where: whereConditions,
    });

    return {
      services,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }

  async getService(slug: string) {
    return await this.prisma.service.findFirstOrThrow({
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
