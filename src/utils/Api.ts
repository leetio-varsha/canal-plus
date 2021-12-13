import axios from "axios";
import {ISearchParams} from "utils/types/api";
import {IMovies} from "utils/types/movies";
import {API_TOKEN, API_URL} from "utils/constants";
const source = axios.CancelToken.source();

const APIInstance = axios.create({
	baseURL: API_URL,
});

const requestOptions = {
	cancelToken: source.token,
};

export const API = {
	searchMovie: async (data: ISearchParams) =>
		APIInstance.get<IMovies>(createGETURL("/search/movie?", {...data}), {
			...requestOptions,
		}),
};

function paramsSerializer(params: {[key: string]: unknown}) {
	return (
		Object.entries(Object.assign({}, {api_key: API_TOKEN}, params))
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			.map(([key, value]) => `${key}=${value}`)
			.join("&")
	);
}

function createGETURL(path: string, params: {[key: string]: unknown}) {
	return `${path}${paramsSerializer(params)}`;
}
