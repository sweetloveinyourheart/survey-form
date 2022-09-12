import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class RecordSelectionItemDTO {
    @IsString()
    text: string
}

class RecordItemDTO {
    @IsOptional()
    @IsString()
    text: string | null

    @IsOptional()
    @ValidateNested()
    @Type(() => RecordSelectionItemDTO)
    selections: RecordSelectionItemDTO[] | null
}

class ContestDTO {
    @IsNumber()
    id: number
}

export class SubmitRecordDTO {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ContestDTO)
    contest: ContestDTO

    @IsArray()
    @ValidateNested()
    @Type(() => RecordItemDTO)
    items: RecordItemDTO[]
}