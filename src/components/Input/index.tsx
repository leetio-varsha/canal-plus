import React, { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import {debounce} from "lodash";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	callback: (value: string) => void;
	debounceDelay?: number;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IProps> = ({callback, debounceDelay = 500, ...rest}, ref) => {
	const debouncedCallback = debounce((e: ChangeEvent<HTMLInputElement>) => {
		callback(e.target.value);
	}, debounceDelay);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => debouncedCallback(e);
	return <InputStyled ref={ref} type="text" onChange={(e) => changeHandler(e)} {...rest} />;
};

export default forwardRef(Input);

const InputStyled = styled.input`
	height: 40px;
	border: 3px solid #003ace;
	border-radius: 5px;
	width: 100%;
`;
