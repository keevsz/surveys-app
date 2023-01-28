import { User } from 'src/users/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: false })
  author_id: number;

  @Column({ default: true })
  state: boolean;

  @ManyToOne(() => User, (user) => user.surveys)
  author: User;
}
