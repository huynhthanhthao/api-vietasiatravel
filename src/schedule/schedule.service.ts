import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { normalizeString } from 'src/utils/translate';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSchedule(userId: string, request: CreateScheduleDto) {
    const data = {
      ...request,
      searchTitle: normalizeString(request.title),
      createdById: userId,
      updatedById: userId,
    };

    return await this.prisma.schedule.create({
      data,
    });
  }

  async updateSchedule(userId: string, id: string, request: UpdateScheduleDto) {
    return await this.prisma.schedule.update({
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

  async deleteSchedule(userId: string, id: string) {
    return await this.prisma.schedule.update({
      where: { id },
      data: {
        updatedById: userId,
        isDeleted: true,
      },
    });
  }

  async getSchedules({ search, sort, scheduleType, page = 1, pageSize = 10 }) {
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

    if (scheduleType) {
      whereConditions = {
        ...whereConditions,
        type: scheduleType,
      };
    }

    const sortCriteria = [];
    if (sort === 'date') {
      sortCriteria.push({ updatedAt: 'desc' });
    } else {
      sortCriteria.push({ priority: 'desc' });
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const schedules = await this.prisma.schedule.findMany({
      where: whereConditions,
      select: {
        id: true,
        slug: true,
        title: true,
        thumbnail: true,
        subContent: true,
      },
      orderBy: sortCriteria,
      skip,
      take,
    });

    const totalCount = await this.prisma.schedule.count({
      where: whereConditions,
    });

    return {
      schedules,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }

  async getSchedule(slug: string) {
    return await this.prisma.schedule.findFirstOrThrow({
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
