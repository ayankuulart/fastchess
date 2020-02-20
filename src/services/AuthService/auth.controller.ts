import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInData } from './dto/signin-data.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signIn(@Body() signInData: SignInData) {
    const result = await this.authService.signIn(signInData);

    return result;
  }

  @Get('refresh-token')
  async checkAuth(@Req() request: RequestWithAuth) {
    return this.authService.getNewTokens(request.headers.authorization);
  }
}
