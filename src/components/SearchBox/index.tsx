import React, {useContext} from "react";
import {MoviesContext} from "components/MoviesContext";
import {Input} from "components/Input";
import styled from "styled-components";
import {TypesEnum} from "utils/types/reducer";

export const SearchBox: React.FC = () => {
	const {dispatch} = useContext(MoviesContext);
	const searchMovieAction = (searchValue: string) => {
		dispatch({type: TypesEnum.SEARCH, payload: searchValue});
	};
	return (
		<Wrapper>
			<Label htmlFor="search-input">Look for a movie?</Label>
			<Input
				callback={searchMovieAction}
				placeholder={"Type to search"}
				id={"search-input"}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 50%;
	margin: auto;
	padding: 10px 0;
	@media (max-width: 768px) {
		padding: 10px;
		width: 100%;
	}
`;

const Label = styled.label`
	margin-bottom: 10px;
	font-weight: bold;
	font-size: 20px;
	display: inline-block;
`;
