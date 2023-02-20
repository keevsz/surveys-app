import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  Index,
} from 'typeorm';
import { Alternative } from '../../alternatives/entities/alternative.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @Column()
  alternativeId: string;

  @ManyToOne(() => Alternative, (alternative) => alternative.answers)
  alternative: Alternative;

  @Column()
  questionId: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Column()
  surveyId: string;

  @ManyToOne(() => Survey, (survey) => survey.answers)
  survey: Survey;

  @Column()
  @Index(['user', 'alternative, question'], { unique: true })
  userQuestionIndex: string;
}
