import { Answer } from 'src/answers/entities/answer.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Alternative } from '../../alternatives/entities/alternative.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text')
  item?: string;

  @Column('boolean', { default: false })
  required?: boolean;

  @Column({ default: false })
  valuable?: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey?: Survey;

  @OneToMany(() => Alternative, (alternative) => alternative.question, {
    cascade: true,
    eager: true,
  })
  alternatives?: Alternative[];

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
  })
  answers?: Answer[];
}
