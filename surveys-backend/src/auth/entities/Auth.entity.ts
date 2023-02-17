import { ISession } from 'connect-typeorm';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Session implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now() + 15 * 86400000;

  @PrimaryColumn('varchar', { length: 255 })
  public id = '';

  @Column('text')
  public json = '';

  @DeleteDateColumn()
  public destroyedAt?: Date;
}
