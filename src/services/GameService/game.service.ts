import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private readonly cats: Game[] = [];

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

  // findAll(): Cat[] {
  //   return this.cats;
  // }
}