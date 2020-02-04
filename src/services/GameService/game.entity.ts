import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameEntity implements Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  black: User["id"];

  @Column('int')
  white: User["id"];

  @Column('character')
  notation: Notation;

  @Column('int')
  state: GameState;
}