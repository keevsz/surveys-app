import { IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlternativeDto } from 'src/alternatives/dto/create-alternative.dto';
import { Alternative } from '../../alternatives/entities/alternative.entity';
export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  item: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsBoolean()
  valuable?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativeDto)
  alternatives: Alternative[];
}
