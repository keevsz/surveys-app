import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity({ name: 'alternatives' })
export class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: true, default: 0 })
  value: number;

  @ManyToOne(() => Question, (question) => question.alternatives, {
    onDelete: 'CASCADE',
  })
  question?: Question;

  @OneToMany(() => Answer, (answer) => answer.alternative)
  answers?: Answer[];
}
