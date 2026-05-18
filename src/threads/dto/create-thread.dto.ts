import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from "class-validator";

export class CreateThreadDto {
    @ApiProperty({ example: 'How do I set up environment variables?', description: 'Thread title (min 5 characters)' })
    @IsString()
    @MinLength(5)
    title!: string;

    @ApiProperty({ example: 'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?', description: 'Thread content / question body (min 10 characters)' })
    @IsString()
    @MinLength(10)
    content!: string;
}