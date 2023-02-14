  import { Type } from 'class-transformer';
  import { IsArray, IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
  import { CreateQuestionDto } from '../../questions/dto/create-question.dto';
import { Question } from '../../questions/entities/Question.entity';

  export class CreateSurveyDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsDate()
    start_date: Date;

    @IsNotEmpty()
    @IsDate()
    end_date: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: Question[];
  }
