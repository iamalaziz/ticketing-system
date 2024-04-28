import { Inject, Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
    constructor(
        @Inject("MYSQL_CONNECTION")
        private readonly mysqlConnection: any,
    ){}

    async getMovies(): Promise<Movie[]>{
        try {
            const [rows] = await this.mysqlConnection.execute('SELECT * FROM movie ');
            return rows 
        } catch (error) {
            throw new Error(`somehting wrong ${error}`)
        }
        
        
    }
}
