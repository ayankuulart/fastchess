import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInData } from '../AuthService/dto/signin-data.dto';
import { RATE_DEFAULT_VALUE } from './consts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) { }

  async createUser(params: User) {
    const userExist = await this.findOne(params.login);

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
          rate: RATE_DEFAULT_VALUE,
          passwordHash: hash,
        };

        return this.usersRepository.save(user);
      });
    });
  }

  findOne(login: string): Promise<UserEntity> {
    return this.usersRepository.findOne({ login });
  }

  async checkPassword(params: SignInData) {
    const user = await this.findOne(params.login);
    console.log(user);
    const result = await bcrypt.compare(params.password, user.passwordHash);

    if (result) {
      return user;
    }
  }
}
