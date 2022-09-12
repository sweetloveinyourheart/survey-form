import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    phone: string

    @IsString()
    password: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    address: string

    @IsArray()
    roles: number[]
}