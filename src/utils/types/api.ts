import {IMovies} from "utils/types/movies";

export interface ISearchParams {
	query: string;
	page: number;
}

export interface IAPIResponse {
	data: IMovies;
}
