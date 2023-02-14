import { Survey } from 'src/surveys/entities/Survey.entity';
import {
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  username: string;

  @Column('text', { nullable: false, select: false })
  password: string;

  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { nullable: true })
  lastname?: string;

  @Column('text', { nullable: true, unique: true })
  email?: string;

  @Column('int', { nullable: true })
  age?: number;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => Survey, (survey) => survey.author)
  surveys: Survey[];

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.username = this.username.toLocaleLowerCase().trim();
    if (this.email) this.email = this.email.toLocaleLowerCase().trim();
  }

  @AfterInsert()
  checkNameIsNull() {
    if (!this.name) this.name = this.username.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}
