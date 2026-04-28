import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Transform(({ value }) => value.trim().toLowerCase().trim())
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase().trim())
    email!: string;

    @IsString()    
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password!: string;
}