import { Body, Controller, Get, Put } from '@nestjs/common';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { UpdateSetting } from './dto/setting.dto';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  async getSetting() {
    return this.settingService.GetSetting();
  }

  @Put()
  @UseJwtGuard()
  async update(@Body() request: UpdateSetting) {
    return this.settingService.UpdateSetting(request);
  }
}
