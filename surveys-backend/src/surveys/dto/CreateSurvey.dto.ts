import { IsNotEmpty } from 'class-validator';

export class CreateSurveyDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  state: boolean;
}
