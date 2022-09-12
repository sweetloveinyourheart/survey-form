import { IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    phone: string

    @IsString()
    password: string
}