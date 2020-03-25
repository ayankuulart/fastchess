import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { UserEntity } from '../UserService/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Injectable()
@WebSocketGateway()
export class GameService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  @WebSocketServer()
  server: Server;

  // @TODO переписать на get/set + добавить лог
  private queue = [];

  async addUserToQueue(userId: number, clientId: string) {
    // @TODO Уведомлять
    const userIsAlreadyInQueue = !this.queue.find(item => item === userId);

    if (userIsAlreadyInQueue) {
      this.queue.push(userId);
    }

    this.createPair(userId, clientId);
  }

  async createPair(id: number, clientId: string) {
    // @TODO User settings {maxRate, minRate, gameMode[ENUM]}
    console.log('start createPair');
    console.log('queue', this.queue)
    const usersInQueue = await this.usersRepository.findByIds(this.queue);
    const enteredUser = usersInQueue.filter(user => user.id === id)[0];

    usersInQueue.forEach(userInQueue => {
      if (enteredUser.id !== userInQueue.id) {
        this.removeUsersFromQueue([enteredUser.id, userInQueue.id]);
        this.startGame([enteredUser.id, userInQueue.id], clientId);
      }
    });
  }

  async startGame(ids: number[], clientId: string) {
    console.log(ids);
    // this.server.emit('')
    this.server.clients(clientId).emit('game', { yourClientId: clientId });
  }

  removeUsersFromQueue(ids: number[]) {
    ids.forEach(id => {
      const inQueueUserIndex = this.queue.findIndex(item => item === id);
      // @TODO splice прожорливый, поменять на более быстрый аналог.
      this.queue.splice(inQueueUserIndex, 1);
    })
  }
}