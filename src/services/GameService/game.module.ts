import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity } from './game.entity';
import { JwtModule } from '@nestjs/jwt';
import { GameEventsGateway } from './game.gateway';
import { UserEntity } from '../UserService/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity, UserEntity]),
    JwtModule.register({
      secret: 'F^%h_-sd^12718@21',
    }),
  ],
  providers: [GameService, GameEventsGateway],
  controllers: [GameController],
})

export class GameModule { }
