import {render, waitFor} from "@testing-library/react";
import {Input} from "components/Input/index";
import userEvent from "@testing-library/user-event";

test("should return value after default (500ms) delay", async () => {
	const onChangeCallback = jest.fn();
	const {getByPlaceholderText} = render(
		<Input callback={onChangeCallback} placeholder={"Test input..."} />
	);
	const input = getByPlaceholderText("Test input...");
	userEvent.type(input, "Mock type");
	expect(onChangeCallback).not.toHaveBeenCalled();
	await waitFor(() => expect(onChangeCallback).toHaveBeenCalledWith("Mock type"), {timeout: 550});
	jest.clearAllMocks();
});

test("should return value after 1s delay", async () => {
	const onChangeCallback = jest.fn();
	const {getByPlaceholderText} = render(
		<Input callback={onChangeCallback} placeholder={"Test input..."} debounceDelay={1000} />
	);
	const input = getByPlaceholderText("Test input...");
	userEvent.type(input, "Mock type");
	expect(onChangeCallback).not.toHaveBeenCalledWith("Mock type");
	await waitFor(() => expect(onChangeCallback).toHaveBeenCalledWith("Mock type"), {
		timeout: 1050,
	});
	jest.clearAllMocks();
});
