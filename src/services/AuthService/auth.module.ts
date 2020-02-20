import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import UserModule from '../UserService';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'F^%h_-sd^12718@21',
    }),
  ],
  controllers: [AuthController],
})

export class AuthModule { }
