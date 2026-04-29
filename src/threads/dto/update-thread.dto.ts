import { IsOptional, IsString, MinLength } from "class-validator"

export class UpdateThreadDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    title?: string;
    
    @IsOptional()
    @IsString()
    @MinLength(10)
    content?: string;
}