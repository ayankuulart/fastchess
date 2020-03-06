import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  async getConfig() {
    const config = await require('./config.json');
    return config;
  }
}
