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
  @PrimaryGeneratedColumn()
  survey_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: false })
  end_date: Date;

  @Column({ default: true })
  state: boolean;

  @Column({ nullable: false })
  author_id: number;

  @ManyToOne(() => User, (user) => user.surveys)
  author: User;

  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
}
