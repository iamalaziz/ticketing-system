import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService){}

    @Get()
    async getMovies(): Promise<Movie[]>{
        const movies = await this.movieService.getMovies();
        return movies
    }
}
