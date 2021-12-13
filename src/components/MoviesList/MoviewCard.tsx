import React, {useState} from "react";
import {IMovie} from "utils/types/movies";
import styled from "styled-components";
import {IMAGES_URL} from "utils/constants";
import ReactCardFlip from "react-card-flip";

export const MovieCard: React.FC<IMovie> = ({
	poster_path,
	title,
	release_date,
	popularity,
	overview,
}) => {
	const [isFlipped, setFlipped] = useState(false);
	return (
		<ReactCardFlip
			isFlipped={isFlipped}
			flipDirection="vertical"
			containerStyle={{marginBottom: "20px", padding: "20px"}}>
			<Card data-testid="movie-card">
				<img src={getPoster(poster_path)} alt="" />
				<SmallInfo>
					{title}
					<Show onClick={() => setFlipped(!isFlipped)}>More info {">"}</Show>
				</SmallInfo>
			</Card>
			<BackCard>
				<Hide onClick={() => setFlipped(!isFlipped)}>X</Hide>
				<BackCardInner>
					<div>
						<b>Rating:</b>
						{popularity}
					</div>
					<div>
						<b>Year:</b> {release_date}
					</div>
					<div>
						<b>Summary:</b> {overview}
					</div>
				</BackCardInner>
			</BackCard>
		</ReactCardFlip>
	);
};

const Card = styled.div`
	width: 250px;
	flex: 0 0 auto;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	max-height: 375px;
	height: 100%;
	img {
		width: 100%;
		height: 100%;
	}
`;
const SmallInfo = styled.div`
	background: rgba(255, 255, 255, 0.8);
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	padding: 20px 0;
	font-size: 18px;
	font-weight: bold;
`;
const BackCard = styled.div`
	background: #87b4ff;
	width: 250px;
	flex: 0 0 auto;
	height: 100%;
	border-radius: 10px;
	max-height: 375px;
	position: relative;
	overflow: hidden;
	z-index: 2;
`;
const BackCardInner = styled.div`
	padding: 20px;
	overflow: scroll;
	height: 90%;
	position: relative;
	z-index: 1;
	div {
		margin-bottom: 10px;
	}
`;

const Show = styled.div`
	font-size: 14px;
	color: #000;
	margin-top: 5px;
	cursor: pointer;
	font-weight: bold;
`;

const Hide = styled.div`
	position: fixed;
	z-index: 2;
	cursor: pointer;
	width: 20px;
	height: 20px;
	text-align: center;
	right: 10px;
	top: 10px;
`;

function getPoster(poster: string | null) {
	return poster
		? `${IMAGES_URL}/${poster}`
		: "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg";
}
