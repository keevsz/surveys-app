import { Survey } from 'src/surveys/entities/Survey.entity';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity, JoinColumn } from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  question_id: number;

  @Column({ nullable: false })
  item: string;

  @Column({ nullable: false })
  obligatorie: boolean;

  @Column({ nullable: false })
  survey_id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @JoinColumn({ name: 'survey_id' })
  encuesta: Survey;
}
