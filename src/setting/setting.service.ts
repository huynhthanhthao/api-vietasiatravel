import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateSetting } from './dto/setting.dto';

@Injectable()
export class SettingService {
  constructor(private readonly prisma: PrismaService) {}

  async GetSetting() {
    const setting = await this.prisma.systemSetting.findFirst();
    return {
      ...setting,
      sliders: setting?.sliders
        ? setting.sliders.split(',').filter((item) => item.trim() !== '')
        : [],
      vouchers: setting?.vouchers
        ? setting.vouchers.split(',').filter((item) => item.trim() !== '')
        : [],
    };
  }

  async UpdateSetting(request: UpdateSetting) {
    const setting = await this.prisma.systemSetting.findFirst();

    if (!setting) {
      throw new Error('Không tìm thấy.');
    }

    const updateSetting = await this.prisma.systemSetting.update({
      where: { id: setting.id },
      data: {
        ...request,
        ...(request.sliders && { sliders: request.sliders.join(',') }),
        ...(request.vouchers && { vouchers: request.vouchers.join(',') }),
      },
    });

    return {
      ...updateSetting,
      sliders: updateSetting?.sliders
        ? updateSetting.sliders.split(',').filter((item) => item.trim() !== '')
        : [],
      vouchers: updateSetting?.vouchers
        ? updateSetting.vouchers.split(',').filter((item) => item.trim() !== '')
        : [],
    };
  }
}
