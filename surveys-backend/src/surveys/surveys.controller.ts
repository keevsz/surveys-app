import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateSurveyDto } from 'src/surveys/dto/create-survey.dto';
import { SurveysService } from 'src/surveys/surveys.service';
import { User } from 'src/users/entities/User.entity';
import { UseGuards, Delete } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/local-guard.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Query } from '@nestjs/common/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller('surveys')
export class SurveysController {
  constructor(
    @Inject(SurveysService) private readonly surveyService: SurveysService,
  ) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
    @GetUser() user: User,
  ) {
    return this.surveyService.create(createSurveyDto, user);
  }

  @Get('/user/:userId')
  @UseGuards(AuthenticatedGuard)
  findAllByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.surveyService.getAllUserSurveys(userId, paginationDto);
  }

  @Get('all')
  @UseGuards(AuthenticatedGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.surveyService.getAll(paginationDto);
  }

  @Get(':surveyId')
  @UseGuards(AuthenticatedGuard)
  findOne(@Param('surveyId', ParseUUIDPipe) surveyId: string) {
    return this.surveyService.getOne(surveyId);
  }

  @Patch(':surveyId')
  @UseGuards(AuthenticatedGuard)
  update(
    @Param('surveyId', ParseUUIDPipe) surveyId: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
    @GetUser() user: User,
  ) {
    return this.surveyService.update(surveyId, updateSurveyDto, user);
  }

  @Delete(':surveyId')
  @UseGuards(AuthenticatedGuard)
  delete(@Param('surveyId', ParseUUIDPipe) surveyId: string) {
    return this.surveyService.delete(surveyId)
  }
}
