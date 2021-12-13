import React, {ChangeEvent, InputHTMLAttributes} from "react";
import styled from "styled-components";
import {debounce} from "lodash";

interface IProps extends InputHTMLAttributes<unknown> {
	callback: (value: string) => void;
	debounceDelay?: number;
}

export const Input: React.FC<IProps> = ({callback, debounceDelay = 500, ...rest}) => {
	const debouncedCallback = debounce((e: ChangeEvent<HTMLInputElement>) => {
		callback(e.target.value);
	}, debounceDelay);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => debouncedCallback(e);
	return <InputStyled type="text" onChange={(e) => changeHandler(e)} {...rest} />;
};

const InputStyled = styled.input`
	height: 40px;
	border: 3px solid #003ace;
	border-radius: 5px;
	width: 100%;
`;
