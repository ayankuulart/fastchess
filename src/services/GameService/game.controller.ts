import { Controller, Get, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface HeadersWithAuth extends Headers {
  authorization: string;
}

interface RequestWithAuth extends Request {
  headers: HeadersWithAuth;
}

@Controller('game')
export class GameController {
  constructor(private readonly jwtService: JwtService) { }
  @Get('check-auth')
  checkAuth(@Req() request: RequestWithAuth): string {
    try {
      this.jwtService.verify(request.headers.authorization);
    } catch (err) {
      return err;
    }

    return 'jwt verify success';
  }
}
