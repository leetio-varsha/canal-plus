import {useEffect, useReducer} from "react";
import {IMovie, IMovies, IMoviesState} from "utils/types/movies";
import {TActions, TypesEnum} from "utils/types/reducer";
import {defaultMovies, moviesState} from "components/MoviesContext/index";
import {API} from "utils/Api";

const getMoviesResults = (payload: IMovies): IMovie[] => payload.results;

const moviesReducer = (state: IMoviesState, action: TActions): IMoviesState => {
	const {type, payload} = action;
	switch (type) {
		case TypesEnum.SEARCH:
			return {
				...state,
				search: payload as string,
			};
		case TypesEnum.UPDATE_MOVIES:
			return {
				...state,
				movies: {
					...(payload as IMovies),
					results: [...state.movies.results, ...getMoviesResults(payload as IMovies)],
				},
			};
		case TypesEnum.SET_PAGE:
			return {
				...state,
				currentPage: payload as number,
			};
		case TypesEnum.CLEAR_ALL:
			return {
				...state,
				currentPage: 1,
				movies: {...defaultMovies},
			};
		default:
			return state;
	}
};

export const useMoviesReducer = () => {
	const [state, dispatch] = useReducer(moviesReducer, moviesState);
	const {search, currentPage} = state;

	const searchMovie = async () => {
		const {data} = await API.searchMovie({
			query: search,
			page: currentPage,
		});
		dispatch({type: TypesEnum.UPDATE_MOVIES, payload: data});
	};

	useEffect(() => {
		if (search.length) {
			void searchMovie();
		}
	}, [currentPage]);

	useEffect(() => {
		if (search.length) {
			dispatch({type: TypesEnum.CLEAR_ALL, payload: null});
			void searchMovie();
		} else {
			dispatch({type: TypesEnum.CLEAR_ALL, payload: null});
		}
	}, [search]);

	return {state, dispatch};
};
