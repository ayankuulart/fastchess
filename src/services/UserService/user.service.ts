import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { SignInData } from '../AuthService/dto/signin-data.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly connection: Connection,
  ) { }

  async createUser(params: User) {
    const userExist = await this.connection.manager.findOne(UserEntity, { login: params.login });

    if (userExist) {
      return 'User is exist. Please type another login';
    }

    return await bcrypt.genSalt(null, (err: Error, salt: string) => {
      return bcrypt.hash(params.password, salt, (errHash: Error, hash: string) => {
        const user = this.connection.manager.create(UserEntity, {
          login: params.login,
          firstName: params.firstName,
          lastName: params.lastName,
          accountLevel: 0,
          rate: 800, // @TODO в константу
          passwordHash: hash,
        });

        return this.connection.manager.save(user);
      });
    });
  }

  async checkPassword(params: SignInData) {
    const user = await this.connection.manager.findOne(UserEntity, { login: params.login });
    const result = await bcrypt.compare(params.password, user.passwordHash);

    return result;
  }
}
