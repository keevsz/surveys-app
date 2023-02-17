import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested, IsOptional, IsString } from 'class-validator';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';
import { Question } from '../../questions/entities/question.entity';

export class CreateSurveyDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  start_date?: string;

  @IsOptional()
  @IsString()
  end_date?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: Question[];

  // alternatives: Alternative[];
}
