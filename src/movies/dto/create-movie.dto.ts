import { IsNotEmpty, Length } from "class-validator";

export class CreateMovieDto{

    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    genre: string;

    @IsNotEmpty()
    language: string;

    @IsNotEmpty()
    @Length(1, 4)
    duration: number;
}