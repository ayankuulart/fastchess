import { Controller, Get, Post, Req, Res, HttpStatus, Body, Request, HttpCode, Header } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { GameEntity } from './game.entity';

@Controller('games')
export class GameController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(@Req() request: Request): void {
    console.log('Create');
    console.log(request)

    // return createConnection().then(connection => {
    //   let game = new GameEntity()

    //   // game.black = _game?.black
    //   // game.white = _game?.white
    //   // game.notation = _game?.notation
    //   // game.state = _game?.state

    //   game.black = 0
    //   game.white = 1
    //   game.notation = ["e2:e4", "e7:e5"]
    //   game.state = GameState.PLAYING

    //   return connection.manager
    //     .save(game)
    //     .then(game => {
    //       console.log(game)
    //     })
    // })
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }
}