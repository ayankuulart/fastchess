import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

export enum MESSAGES {
  ADD_TO_QUEUE = 'ADD_TO_QUEUE'
}

@WebSocketGateway()
export class GameEventsGateway {
  constructor(private readonly gameService: GameService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(MESSAGES.ADD_TO_QUEUE)
  queue(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket
  ) {
    // @TODO проверять токен, иначе можно отправить id другого игрока
    console.log(userId, client.id);
    this.gameService.addUserToQueue(userId, client.id);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}