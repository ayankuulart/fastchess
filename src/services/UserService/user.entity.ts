import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character', { length: 24 })
  login: string;

  @Column('character varying', { length: 255, nullable: true })
  firstName: string;

  @Column('character varying', { length: 255, nullable: true })
  lastName: string;

  @Column('smallint')
  accountLevel: number;

  @Column('smallint', { nullable: true })
  age: number;

  @Column('smallint')
  rate: number;

  @Column('character varying', { length: 255 })
  passwordHash: string;
}
