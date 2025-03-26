import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { hash } from 'src/utils/bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: CreateUserDto) {
    const hashPassword = await hash(data.password);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async findUserById(userId: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    if (data.password) data.password = await hash(data.password);
    const user = await this.prismaService.user.update({
      where: { id: id },
      data,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async deleteUser(id: string) {
    const user = await this.prismaService.user.update({
      where: { id: id },
      data: { isDeleted: true },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async listUsers({ search, page = 1, pageSize = 10 }) {
    let whereConditions: any = { isDeleted: false };

    if (search) {
      whereConditions = {
        ...whereConditions,
        OR: [{ email: { contains: search, mode: 'insensitive' } }],
      };
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const users = await this.prismaService.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        email: true,
      },
      skip,
      take,
    });

    const totalCount = await this.prismaService.user.count({
      where: whereConditions,
    });

    return {
      users,
      paginate: {
        totalCount,
        pageCount: Math.ceil(totalCount / pageSize),
        currentPage: page,
      },
    };
  }
}
