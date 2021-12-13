/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access*/
import {MoviesContextStateProvide} from "components/MoviesContext/index";
import {useMoviesReducer} from "components/MoviesContext/useMoviesContext";
import {renderHook, act} from "@testing-library/react-hooks";
import {TypesEnum} from "utils/types/reducer";

test("should have default context", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});
	expect(result.current.state.currentPage).toBe(1);
});

test("should update search value", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});

	act(() => {
		result.current.dispatch({type: TypesEnum.SEARCH, payload: "test"});
	});

	expect(result.current.state.search).toBe("test");
});

test("should update currentPage value", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});

	act(() => {
		result.current.dispatch({type: TypesEnum.SET_PAGE, payload: 1});
	});

	expect(result.current.state.currentPage).toBe(1);
});

test("should update movies value", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});

	act(() => {
		result.current.dispatch({
			type: TypesEnum.UPDATE_MOVIES,
			payload: {
				page: 2,
				results: [],
				total_pages: 2,
				total_results: 2,
			},
		});
	});

	expect(result.current.state.movies.page).toBe(2);
});

test("should clear state", () => {
	const {result} = renderHook(() => useMoviesReducer(), {
		wrapper: ({children}) => <MoviesContextStateProvide>{children}</MoviesContextStateProvide>,
	});

	act(() => {
		result.current.dispatch({
			type: TypesEnum.CLEAR_ALL,
			payload: null,
		});
	});

	expect(result.current.state.currentPage).toBe(1);
});
