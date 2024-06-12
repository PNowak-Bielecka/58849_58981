import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsLowercase, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { UserRole } from "../enums/user-role.enum";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(6, 20)
    password: string;

    @ApiProperty()
    @IsString()
    @MaxLength(20)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(30)
    lastName: string;

    @ApiProperty()
    @IsDateString()
    birthDate: Date;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isEmployee: boolean;

    @ApiPropertyOptional()
    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole;

}