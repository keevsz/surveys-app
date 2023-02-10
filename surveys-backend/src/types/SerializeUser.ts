import { Exclude } from 'class-transformer';
import { Survey } from 'src/surveys/entities/Survey.entity';

export class SerializedUser {
  id: number;
  username: string;
  state: boolean;
  surveys: [Survey]

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

