import { IsEmail, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

}