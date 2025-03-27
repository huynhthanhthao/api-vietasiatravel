import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTourDto, UpdateTourDto } from './dto/tour.dto';
import { normalizeString } from 'src/utils/translate';

@Injectable()
export class TourService {
  constructor(private readonly prisma: PrismaService) {}

  async createTour(userId: string, request: CreateTourDto) {
    const data = {
      ...request,
      searchTitle: normalizeString(request.title),
      createdById: userId,
      updatedById: userId,
    };

    return await this.prisma.tour.create({
      data,
    });
  }

  async updateTour(userId: string, id: string, request: UpdateTourDto) {
    return await this.prisma.tour.update({
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

  async deleteTour(userId: string, id: string) {
    return await this.prisma.tour.update({
      where: { id },
      data: {
        updatedById: userId,
        isDeleted: true,
      },
    });
  }

  async getTours({
    search,
    sort,
    tourType = null,
    regionType = null,
    categories = [],
    page = 1,
    pageSize = 10,
    isCombo,
  }) {
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

    if (categories.length > 0 || tourType || regionType) {
      whereConditions.category = {
        AND: [],
      };

      if (categories.length > 0) {
        whereConditions.category.AND.push({
          id: { in: categories, mode: 'insensitive' },
        });
      }

      if (tourType) {
        whereConditions.category.AND.push({
          tourType: tourType,
        });
      }

      if (regionType) {
        whereConditions.category.AND.push({
          regionType: regionType,
        });
      }
    }

    if (isCombo !== null) {
      whereConditions.isCombo = isCombo;
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

    const tours = await this.prisma.tour.findMany({
      where: whereConditions,
      select: {
        id: true,
        slug: true,
        title: true,
        thumbnail: true,
        price: true,
        duration: true,
        vehicle: true,
        departure: true,
        remaining: true,
        departureDate: true,
        updatedAt: true,
        priority: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            regionType: true,
            tourType: true,
          },
        },
        isCombo: true,
      },
      orderBy: sortCriteria,
      skip,
      take,
    });

    const totalCount = await this.prisma.tour.count({
      where: whereConditions,
    });

    return {
      tours: tours,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }

  async getTour(slug: string) {
    return await this.prisma.tour.findFirstOrThrow({
      where: {
        slug,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            regionType: true,
            tourType: true,
          },
        },
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
