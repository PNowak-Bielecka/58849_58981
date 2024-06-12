import { IsBoolean, IsDate, IsEmail, IsEnum, IsLowercase, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
import { CreateUserDto } from "./create-user.dto";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class EditUserDto extends CreateUserDto{

    @ApiPropertyOptional()
    @IsOptional()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    password: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional()
    @IsOptional()
    lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    birthDate: Date;

    @ApiPropertyOptional()
    @IsOptional()
    isEmployee: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    role: UserRole;

}