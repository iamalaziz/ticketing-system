import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, Length, } from 'class-validator';

export class CreateMovieDto {
    @ApiProperty({
    	description: 'Title of movie',
    	example: 'Avatar',
    })
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({
    	description: 'Genre of movie',
    	example: 'Sci-Fi',
    })
    @IsNotEmpty()
    genre: string;

    @ApiProperty({
    	description: 'Language of movie',
    	example: 'French',
    })
    @IsNotEmpty()
    language: string;

    @ApiProperty({
    	description: 'Duration of movie',
    	minimum: 1,
    	maximum: 4,
    })
    @IsNotEmpty()
    @Length(1, 4)
    duration: number;
}
