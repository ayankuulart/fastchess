import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity } from './game.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity]),
    JwtModule.register({
      secret: 'F^%h_-sd^12718@21',
    }),
  ],
  providers: [GameService],
  controllers: [GameController],
})

export class GameModule { }
