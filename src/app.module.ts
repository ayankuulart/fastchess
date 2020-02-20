import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameModule from './services/GameService';
import AuthModule from './services/AuthService';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import UserModule from './services/UserService';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GameModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})

export class AppModule { }
