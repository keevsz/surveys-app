import { IsUUID, IsArray, ValidateNested } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';
import { Type } from 'class-transformer';

export class CreateReqAnswerDto {
  @IsUUID()
  surveyId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}
