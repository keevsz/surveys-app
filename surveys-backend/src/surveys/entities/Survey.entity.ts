import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Answer } from '../../answers/entities/answer.entity';
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
  start_date?: string;

  @Column({ nullable: true })
  end_date?: string;

  @Column({ default: true })
  state: boolean;

  @ManyToOne(() => User, (user) => user.surveys)
  user: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
    eager: true,
  })
  questions?: Question[];

  @OneToMany(() => Answer, (answer) => answer.survey, {
    cascade: true,
    eager: true,
  })
  answers?: Answer[];
}
