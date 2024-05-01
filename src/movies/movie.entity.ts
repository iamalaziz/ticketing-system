import { ApiProperty } from "@nestjs/swagger";

export class Movie{
    @ApiProperty()
    id?: number; 

    @ApiProperty()
    title?: string;
    
    @ApiProperty()
    genre?: string;
    
    @ApiProperty()
    language?: string;
    
    @ApiProperty()
    duration?: number;
}