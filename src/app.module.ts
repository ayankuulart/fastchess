import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameModule from './services/GameService';
import AuthModule from './services/AuthService';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GameModule,
    AuthModule,
  ],
  controllers: [AppController],
})

export class AppModule { }
