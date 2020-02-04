import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameModule from './services/GameService';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GameModule
  ]
})

export class AppModule { }