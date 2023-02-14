import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateSurveyDto } from 'src/surveys/dto/CreateSurvey.dto';
import { SurveysService } from 'src/surveys/surveys.service';
import { User } from 'src/users/entities/User.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/local-guard.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('surveys')
export class SurveysController {
  constructor(
    @Inject(SurveysService) private readonly surveyService: SurveysService,
  ) {}

  //TODO: Here!
  @Post()
  @UseGuards(AuthenticatedGuard)
  createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @GetUser() user: User,
  ) {
    return this.surveyService.create(createSurveyDto, user);
  }
}
