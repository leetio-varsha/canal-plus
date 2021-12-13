import React, {createContext} from "react";
import {IMoviesState} from "utils/types/movies";
import {TActions} from "utils/types/reducer";
import {useMoviesReducer} from "components/MoviesContext/useMoviesContext";

interface IMoviesContext {
	state: IMoviesState;
	dispatch: React.Dispatch<TActions>;
}

export const defaultMovies = {
	page: 1,
	results: [],
	total_pages: 1,
	total_results: 0,
};

export const moviesState: IMoviesState = {
	search: "",
	movies: {...defaultMovies},
	currentPage: 1,
};

export const MoviesContext = createContext<IMoviesContext>({
	state: moviesState,
	dispatch: () => null,
});

export const MoviesContextStateProvide: React.FC = ({children}) => {
	const {state, dispatch} = useMoviesReducer();
	return <MoviesContext.Provider value={{state, dispatch}}>{children}</MoviesContext.Provider>;
};
