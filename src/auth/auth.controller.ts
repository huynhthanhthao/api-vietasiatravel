import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreadentialDto,
  RefreshTokenDto,
  UpdatePasswordDto,
} from './dto/credential.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseJwtGuard } from 'src/utils/decorators/use-jwt-guard.decorator';
import { GetUser } from 'src/utils/user';
import { AccountService } from 'src/account/account.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('/login')
  login(@Body() credential: CreadentialDto) {
    return this.authService.login(credential);
  }

  @Put('update-password')
  @UseJwtGuard()
  updatePassword(@Body() credential: UpdatePasswordDto, @GetUser() user: any) {
    credential.email = user.email;
    return this.authService.changePassword(credential);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    return this.accountService.findUserById(req.user.userId);
  }
}
