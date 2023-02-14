import { PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../../questions/entities/Question.entity';
export class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: true, default: 0 })
  value: number;

//   @ManyToOne(() => Question, (question) => question.alternatives, {
//     onDelete: 'CASCADE',
//   })
//   question: Question;
}
