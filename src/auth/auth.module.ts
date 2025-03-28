import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import JwtStrategy from './jwt.strategy';
import { JWTUtils } from './jwt-utils';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JWTUtils, AccountService],
  controllers: [AuthController],
})
export class AuthModule {}
