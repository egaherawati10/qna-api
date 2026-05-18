import { ApiProperty } from '@nestjs/swagger'
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'johndoe', description: 'Unique username (max 50 characters)' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Transform(({ value }) => value.trim().toLowerCase().trim())
    username!: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Valid email address' })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase().trim())
    email!: string;

    @ApiProperty({ example: 'password123', description: 'Password (min 8 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password!: string;
}