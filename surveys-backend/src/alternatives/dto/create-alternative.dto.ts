import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAlternativeDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  value: number;
}
