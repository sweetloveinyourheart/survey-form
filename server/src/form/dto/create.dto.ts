import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { AnswerType } from "../entities/question.entity";
import { Type } from 'class-transformer';

class AnswerSelectionDTO {
    @IsOptional()
    id?: number

    @IsString()
    text: string
}

class AnswerDTO {
    @IsOptional()
    id?: number

    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerSelectionDTO)
    selections: AnswerSelectionDTO[]
}

class QuestionDTO {
    @IsOptional()
    id?: number

    @IsString()
    question: string

    @IsOptional()
    @IsString() 
    image: string

    @IsEnum(AnswerType)
    answerType: AnswerType

    @IsObject()
    @ValidateNested()
    @Type(() => AnswerDTO)
    answer: AnswerDTO
}

export class FormDTO {
    @IsOptional()
    id?: number

    @IsString()
    title: string

    @IsString()
    author: string

    @IsOptional()
    @IsString()
    description: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDTO)
    questions: QuestionDTO[]
}