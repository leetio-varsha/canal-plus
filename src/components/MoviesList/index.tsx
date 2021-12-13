import React, {useContext} from "react";
import styled from "styled-components";
import {MoviesContext} from "components/MoviesContext";
import {MovieCard} from "components/MoviesList/MoviewCard";
import {TypesEnum} from "utils/types/reducer";

export const MoviesList: React.FC = () => {
	const {state, dispatch} = useContext(MoviesContext);
	const {movies} = state;
	const isShowMore = movies.page < movies.total_pages;
	const showMoreHandler = () => {
		dispatch({type: TypesEnum.SET_PAGE, payload: state.currentPage + 1});
	};

	return (
		<>
			<Wrapper>
				{!movies.results.length ? <NoResults>No results</NoResults> : null}
				{movies.results.map((movie) => (
					<MovieCard key={movie.id} {...movie} />
				))}
			</Wrapper>
			{isShowMore ? <ShowMore onClick={showMoreHandler}>Show more</ShowMore> : null}
		</>
	);
};

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	flex: 1;
`;
const NoResults = styled.div`
	font-size: 30px;
	font-weight: bold;
`;
const ShowMore = styled.button`
	width: 100%;
	background: #347ff5;
	color: #fff;
	border: none;
	margin: 0 auto;
	height: 30px;
	font-weight: bold;
	text-transform: uppercase;
`;
