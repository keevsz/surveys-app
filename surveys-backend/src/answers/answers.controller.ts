import { Controller, Post, Body } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AnswersService } from './answers.service';
import { User } from '../users/entities/user.entity';
import { CreateReqAnswerDto } from './dto/create-req-answer.dto';
import { AuthenticatedGuard } from 'src/auth/guards/local-guard.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('answers')
@UseGuards(AuthenticatedGuard)
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(@Body() createAnswerDto: CreateReqAnswerDto, @GetUser() user: User) {
    return this.answersService.create(createAnswerDto, user);
  }
}
