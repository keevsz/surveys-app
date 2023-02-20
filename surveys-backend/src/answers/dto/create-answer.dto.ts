import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @IsUUID()
  @IsNotEmpty()
  alternativeId: string;
}
