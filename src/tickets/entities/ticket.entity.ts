import { ApiProperty } from "@nestjs/swagger";

export class Ticket {

    @ApiProperty()
    id?: number; 

    @ApiProperty()
    seat_number?: string;
    
    @ApiProperty()
    price?: number;
    
    @ApiProperty()
    type?: 'front' | 'middle' | 'balcony';
    
    @ApiProperty()
    fk_movie_id?: number;

    constructor(id: number, fk_movie_id: number ) {
        this.id = id;
        this.fk_movie_id = fk_movie_id;
      }
}
