import { Survey } from 'src/surveys/entities/Survey.entity';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity, OneToMany } from 'typeorm';
import { Alternative } from '../../alternatives/entities/alternative.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  item?: string;

  @Column('boolean', { default: false })
  required?: boolean;

  @Column({ default: false })
  valuable?: boolean;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  // @OneToMany(() => Alternative, (alternative) => alternative.question, {
  //   cascade: true,
  //   eager: true,
  // })
  // alternatives?: Alternative[];
}
