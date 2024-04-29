import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService){}

    @Get()
    async getMovies(): Promise<Movie[]>{
        const movies = await this.movieService.getMovies();
        return movies
    }

    @Get(":id")
    async findMovieById(@Param('id') id: number): Promise<Movie | string>{
        const movie = await this.movieService.getMovieById(id);
        return movie;
    }

    @Post("create")
    async createMovie(@Body() movieData: CreateMovieDto): Promise<any>{
        try {
            const res = await this.movieService.createMovie(movieData);
            return res
        } catch (error) {
            throw new BadRequestException(`Failed to create movie: ${error}`)            
        }
    }

    @Patch(":id")
    async updateMovie(@Param('id') id:number, @Body() movieData: UpdateMovieDto): Promise<Movie>{
        try {
            const res = await this.movieService.updateMovie(id, movieData);
            return res
        } catch (error) {
            throw new BadRequestException(`Failed to update movie: ${error}`)            
        }
    }

    @Delete(':id')
    deleteMovie(@Param("id") id: number){
        return this.movieService.deleteMovie(id)
    }
}
