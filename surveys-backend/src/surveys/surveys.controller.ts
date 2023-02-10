import {
  Body,
  Controller,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateSurveyDTO } from 'src/surveys/dto/CreateSurvey.dto';
import { SurveysService } from 'src/surveys/surveys.service';
import { User } from 'src/users/entities/User.entity';

@Controller('surveys')
export class SurveysController {
  constructor(
    @Inject(SurveysService) private readonly surveyService: SurveysService,
  ) {}

  @Get()
  getSurveys() {
    return this.surveyService.getSurveys();
  }

  @Get(':id')
  getSurvey(@Param('id', ParseIntPipe) survey_id: number) {
    return this.surveyService.getSurveyById(survey_id);
  }

  @Post()
  createSurvey(@Body() survey: any, @Req() req: Request) {
    //falta validar auth
    const authenticatedUser = req.user as User;

    return this.surveyService.createSurvey(survey, authenticatedUser);
  }
}
