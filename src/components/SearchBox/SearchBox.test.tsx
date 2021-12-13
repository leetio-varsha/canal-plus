import {render} from "@testing-library/react";
import {SearchBox} from "components/SearchBox/index";

test("should render <SearchBox/>", () => {
	const {getByLabelText, getByPlaceholderText} = render(<SearchBox />);
	const label = getByLabelText("Look for a movie?");
	const input = getByPlaceholderText("Type to search");
	expect(label).toBeInTheDocument();
	expect(input).toBeInTheDocument();
});
