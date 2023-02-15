import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity('alternatives')
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
}
