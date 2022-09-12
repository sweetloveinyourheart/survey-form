import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

class ContestFormDTO {
    @IsNumber()
    id: number
}

class ContestUserDTO {
    @IsNumber()
    id: number
}

export class CreateContestDTO {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ContestFormDTO)
    form: ContestFormDTO

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ContestUserDTO)
    users: ContestUserDTO[]
}