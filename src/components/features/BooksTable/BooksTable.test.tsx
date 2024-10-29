import { MOCK_STATE } from "src/config/consts";
import { renderWithProviders } from "src/lib/testUtils";
import BooksTable from "./BooksTable";
import { screen } from "@testing-library/react";

describe("BooksTable", () => {
	it("should match snapshot with preloaded state", () => {
		const { container } = renderWithProviders(<BooksTable />, {
			preloadedState: {
				dataReducer: MOCK_STATE,
			},
		});

		expect(container).toMatchSnapshot();
	});

	it("should render image and have correct alt attr", () => {
		renderWithProviders(<BooksTable />, {
			preloadedState: {
				dataReducer: MOCK_STATE,
			},
		});
		const img = screen.getByRole("img");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute(
			"alt",
			"The Modern JavaScript Basics Tutorial by Be Sure Academy volume cover"
		);
	});
});
