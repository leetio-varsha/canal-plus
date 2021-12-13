import {IMovies} from "utils/types/movies";

export type Action<T extends {[index: string]: any}> = {
	[Key in keyof T]: T[Key] extends undefined
		? {type: Key}
		: {
				type: Key;
				payload: T[Key];
		  };
};

export enum TypesEnum {
	SEARCH = "search",
	UPDATE_MOVIES = "update_movies",
	SET_PAGE = "set_page",
	CLEAR_ALL = "clear_all",
}

export interface IPayload {
	[TypesEnum.SEARCH]: string;
	[TypesEnum.UPDATE_MOVIES]: IMovies;
	[TypesEnum.SET_PAGE]: number;
	[TypesEnum.CLEAR_ALL]: null;
}

export type TActions = Action<IPayload>[keyof Action<IPayload>];
