import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignInData } from './dto/signin-data.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../UserService/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(params: SignInData) {
    const passwordIsCorrect = await this.userService.checkPassword(params);

    // tslint:disable-next-line: no-console
    console.log('passwordIsCorrect: ', passwordIsCorrect);

    if (passwordIsCorrect) {
      return {
        access_token: this.jwtService.sign({}, { expiresIn: 30 }),
        refresh_token: this.jwtService.sign({}, { expiresIn: 60 }),
      };
    }
  }

  async getNewTokens(token: string) {
    try {
      if (this.jwtService.verify(token)) {
        return {
          access_token: this.jwtService.sign({}, { expiresIn: 30 }),
          refresh_token: this.jwtService.sign({}, { expiresIn: 60 }),
        };
      }
    } catch (err) {
      return err;
    }
  }
}
