import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
	constructor(private readonly movieService: MoviesService) {}

	@ApiResponse({
		status: 200,
		description: "Successful got all movies ",
	})
	@ApiResponse({
		status: 400,
		description: "Cannot get movies",
	})
	@Get()
	async getMovies(): Promise<Movie[]> {
		const movies = await this.movieService.getMovies();

		return movies;
	}

	@ApiQuery({
		name: "id",
		required: false,
		type: Number,
		description: "ID of movie",
	})
	@ApiResponse({
		status: 200,
		description: "Successful response",
	})
	@ApiResponse({
		status: 400,
		description: "Bad request",
	})
	@Get(":id")
	async findMovieById(@Param("id") id: number): Promise<Movie | string> {
		const movie = await this.movieService.getMovieById(id);

		return movie;
	}

	@ApiBody({
		type: CreateMovieDto,
		description: "Data for creating movie",
	})
	@ApiResponse({
		status: 201,
		description: "Movie created successfully",
	})
	@ApiResponse({
		status: 400,
		description: "Bad request",
	})
	@Post("create")
	async createMovie(@Body() movieData: CreateMovieDto): Promise<any> {
		try {
			const res =
				await this.movieService.createMovie(movieData);

			return res;
		} catch (error) {
			throw new BadRequestException(
				`Failed to create movie: ${error}`,
			);
		}
	}

	@ApiBody({
		type: UpdateMovieDto,
		description: "Data for creating movie",
	})
	@ApiResponse({
		status: 201,
		description: "Movie updated successfully",
	})
	@ApiResponse({
		status: 400,
		description: "Failed to update movie",
	})
	@Patch(":id")
	async updateMovie(
		@Param("id") id: number,
		@Body() movieData: UpdateMovieDto,
	): Promise<Movie> {
		try {
			const res = await this.movieService.updateMovie(
				id,
				movieData,
			);

			return res;
		} catch (error) {
			throw new BadRequestException(
				`Failed to update movie: ${error}`,
			);
		}
	}

	@ApiResponse({
		status: 200,
		description: "Movie deleted successfully",
	})
	@ApiResponse({
		status: 404,
		description: "Movie not found",
	})
	@Delete(":id")
	deleteMovie(@Param("id") id: number) {
		return this.movieService.deleteMovie(id);
	}
}
