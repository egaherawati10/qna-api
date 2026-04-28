import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
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