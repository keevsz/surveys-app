import { Question } from 'src/questions/entities/Question.entity';
import { User } from 'src/users/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'surveys' })
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: true })
  state: boolean;

  @ManyToOne(() => User, (user) => user.surveys)
  user: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
    eager: true,
  })
  questions?: Question[];
}
