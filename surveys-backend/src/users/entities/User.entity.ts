import { Survey } from 'src/surveys/entities/Survey.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  state: boolean;

  @OneToMany(() => Survey, (survey) => survey.author)
  surveys: Survey[];
}
