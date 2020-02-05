import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly connection: Connection) { }

  async createUser(user: User) {
    await bcrypt.genSalt(null, (err: Error, salt: string) => {
      bcrypt.hash(user.password, salt, (errHash: Error, hash: string) => {
        // tslint:disable-next-line: no-console
        console.log(hash);
        this.connection
          .createQueryBuilder()
          .insert()
          .into('users')
          .values([
            {
              first_name: user.firstName,
              last_name: user.lastName,
              age: user.age,
              rate: 800,
              account_level: 0,
              login: user.login,
              password_hash: hash,
            },
          ])
          .execute();
      });
    });
  }
}
