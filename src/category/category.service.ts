import { Injectable } from '@nestjs/common';
import { Prisma, TourType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { generateCategoryId } from 'src/utils/generateCategoryId';
import { normalizeString } from 'src/utils/translate';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(type: TourType) {
    const regionOrder = [
      'NORTH',
      'CENTRAL',
      'SOUTH',
      'OTHER',
      'EUROPE',
      'ASIA',
      'MIDDLE_EAST',
      'NORTH_AMERICA',
      'SOUTH_AMERICA',
      'AFRICA',
      'OCEANIA',
    ];

    const groupedCategories = await this.prisma.$queryRaw`
      SELECT "regionType", JSON_AGG(
        JSON_BUILD_OBJECT('id', "id", 'name', "name")
      ) AS categories
      FROM "CategoryTour"
      WHERE "tourType" = CAST(${type} AS "TourType") AND "isDeleted" = false
      GROUP BY "regionType"
      ORDER BY ARRAY_POSITION(ARRAY[${Prisma.join(
        regionOrder,
      )}], "regionType"::TEXT);
    `;

    return groupedCategories;
  }

  async getListCategories({ search, sort, tourType, page = 1, pageSize = 10 }) {
    let whereConditions: any = { isDeleted: false };

    if (search) {
      whereConditions = {
        ...whereConditions,
        OR: [
          {
            searchName: {
              contains: normalizeString(search),
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (tourType) {
      whereConditions = {
        ...whereConditions,
        tourType: tourType,
      };
    }

    const sortCriteria = [];
    if (sort === 'name') {
      sortCriteria.push({ name: 'asc' });
    } else {
      sortCriteria.push({ tourType: 'asc' });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const categories = await this.prisma.categoryTour.findMany({
      where: whereConditions,
      orderBy: sortCriteria,
      skip,
      take,
    });

    const totalCount = await this.prisma.categoryTour.count({
      where: whereConditions,
    });

    return {
      categories,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }

  async createCategory(request: CreateCategoryDto) {
    return await this.prisma.categoryTour.create({
      data: {
        ...request,
        id: generateCategoryId(request.name),
        searchName: normalizeString(request.name),
      },
    });
  }

  async updateCategory(id: string, request: UpdateCategoryDto) {
    return await this.prisma.categoryTour.update({
      where: { id },
      data: {
        ...request,
        ...(request.name && { searchName: normalizeString(request.name) }),
      },
    });
  }

  async deleteCategory(id: string) {
    return await this.prisma.categoryTour.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async getCategory(id: string) {
    return await this.prisma.categoryTour.findUniqueOrThrow({
      where: { id },
    });
  }
}
