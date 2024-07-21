import { Inject, Injectable } from "@nestjs/common";
import { Movie } from "./movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Injectable()
export class MoviesService {
	constructor(
		@Inject("MYSQL_CONNECTION")
		private readonly mysqlConnection: any,
	) {}

	async getMovies(): Promise<Movie[]> {
		try {
			const [rows] = await this.mysqlConnection.execute("SELECT * FROM movie ");

			return rows;
		} catch (error) {
			throw new Error(`Cannot find any movies ${error}`);
		}
	}

	async getMovieById(id: number): Promise<Movie | string> {
		try {
			const [rows] = await this.mysqlConnection.execute("SELECT * FROM movie WHERE id = ?", [id]);

			if (rows.length > 0) {
				return rows[0];
			} else {
				return "No movie with such ID";
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	async createMovie(movieData: CreateMovieDto): Promise<Movie> {
		try {
			const sql = "SELECT * FROM movie WHERE title = ?;";
			const movieExists = await this.mysqlConnection.query(sql, [movieData.title]);

			if (movieExists[0].length !== 0) {
				throw new Error(`This movie with the title "${movieData.title}" aready exists}"`);
			}
			await this.mysqlConnection.query(
				"INSERT INTO movie (title, genre, language, duration) VALUES (?, ?, ?, ?);",
				[...Object.values(movieData)],
			);

			return movieData;
		} catch (error) {
			throw new Error(`Error while creating movie: ${error}`);
		}
	}

	async updateMovie(movieId: number, movieData: UpdateMovieDto): Promise<Movie> {
		try {
			const sql = "SELECT * FROM movie WHERE id = ?;";
			const movieExists = await this.mysqlConnection.query(sql, [movieId]);
			if (movieExists[0] === 0) {
				throw new Error("There is no movie with id " + movieId);
			}

			await this.mysqlConnection.query(
				"UPDATE movie SET title = ?, genre = ?, language = ?, duration = ? WHERE id = ?;",
				[...Object.values(movieData), movieId],
			);

			return movieData;
		} catch (error) {
			throw new Error("Error while updating movie: " + error);
		}
	}

	async deleteMovie(movieId: number): Promise<Movie | string> {
		try {
			const [rows] = await this.mysqlConnection.execute("SELECT * FROM movie WHERE id = ?", [
				movieId,
			]);

			if (rows.length > 0) {
				await this.mysqlConnection.query("DELETE FROM movie WHERE id = ?;", [movieId]);

				return "Movie deleted successfully";
			} else {
				return "No movie with such ID";
			}
		} catch (error) {
			console.error("Error:", error);

			return "Error occurred while deleting";
		}
	}
}
