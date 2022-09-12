import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { Form } from './entities/form.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerSelection } from './entities/answer-selection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Question, Answer, AnswerSelection])
  ],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
