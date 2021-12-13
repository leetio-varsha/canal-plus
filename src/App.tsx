import React from "react";
import {MoviesContextStateProvide} from "components/MoviesContext";
import {SearchBox} from "components/SearchBox";
import {MoviesList} from "components/MoviesList";
import styled from "styled-components";

const App: React.FC = () => {
	return (
		<AppWrapper>
			<MoviesContextStateProvide>
				<SearchBox />
				<MoviesList />
			</MoviesContextStateProvide>
		</AppWrapper>
	);
};

const AppWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export default App;
