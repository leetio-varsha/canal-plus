import {render} from "@testing-library/react";
import {MoviesList} from "components/MoviesList/index";
import {act, renderHook} from "@testing-library/react-hooks";
import {TypesEnum} from "utils/types/reducer";
import {useMoviesReducer} from "components/MoviesContext/useMoviesContext";
import {MoviesContext, MoviesContextStateProvide} from "components/MoviesContext";
import {IMovies} from "utils/types/movies";

test("should render <MoviesList />", () => {
	const {getByText} = render(<MoviesList />);
	const emptyText = getByText("No results");
	expect(emptyText).toBeInTheDocument();
});

const moviesMock: IMovies = {
	page: 1,
	results: [
		{
			adult: false,
			backdrop_path: "/dB0CxRwLXJoOrRPUvsJjb2hnPtq.jpg",
			id: 624860,
			genre_ids: [],
			original_language: "en",
			original_title: "The Matrix Resurrections",
			overview:
				"Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
			popularity: 253.931,
			poster_path: "/xLNtaLaHudIzOqdEZ7R3lcDLrQQ.jpg",
			release_date: "2021-12-16",
			title: "The Matrix Resurrections",
			video: false,
			vote_average: 8,
			vote_count: 6,
		},
	],
	total_pages: 1,
	total_results: 1,
};

test("should display <MoviesList /> card", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});
	act(() => {
		result.current.dispatch({
			type: TypesEnum.UPDATE_MOVIES,
			payload: moviesMock,
		});
	});

	const {getByTestId} = render(
		<MoviesContext.Provider value={result.current}>
			<MoviesList />
		</MoviesContext.Provider>
	);

	expect(getByTestId("movie-card")).toBeInTheDocument();
});
