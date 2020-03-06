import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInData } from '../AuthService/dto/signin-data.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) { }

  async createUser(params: User) {
    const userExist = await this.findUserByLogin(params.login);

    if (userExist) {
      return 'User is exist. Please type another login';
    }

    return await bcrypt.genSalt(null, (err: Error, salt: string) => {
      return bcrypt.hash(params.password, salt, (errHash: Error, hash: string) => {
        const user = {
          login: params.login,
          firstName: params.firstName,
          lastName: params.lastName,
          accountLevel: 0,
          rate: 800, // @TODO в константу
          passwordHash: hash,
        };

        return this.usersRepository.create(user);
      });
    });
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async findUserByLogin(login: string): Promise<UserEntity> {
    // @TODO findByOne
    const user = await this.usersRepository.find({ login });
    return user[0];
  }

  async checkPassword(params: SignInData) {
    const user = await this.findUserByLogin(params.login);
    const result = await bcrypt.compare(params.password, user.passwordHash);

    if (result) {
      return user;
    }

    // return result;
  }
}
