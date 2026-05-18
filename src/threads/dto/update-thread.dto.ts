import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from "class-validator"

export class UpdateThreadDto {
    @ApiPropertyOptional({ example: 'Updated thread title here', description: 'New title for the thread (min 5 characters, optional)' })
    @IsOptional()
    @IsString()
    @MinLength(5)
    title?: string;

    @ApiPropertyOptional({ example: 'Updated content with more details about the question...', description: 'New content for the thread (min 10 characters, optional)' })
    @IsOptional()
    @IsString()
    @MinLength(10)
    content?: string;
}