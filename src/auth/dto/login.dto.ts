import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'johndoe@example.com', description: 'Registered email address' })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase().trim())
    email!: string;

    @ApiProperty({ example: 'password123', description: 'Account password (min 8 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password!: string;
}