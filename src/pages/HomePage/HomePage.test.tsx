import { MOCK_STATE } from "src/config/consts";
import HomePage from "./HomePage";
import { renderWithProviders } from "src/lib/testUtils";
import { screen } from "@testing-library/react";

describe("Home Page", () => {
	it("should renders correctly if loading status is idle and have data", async () => {
		const { container } = renderWithProviders(<HomePage />, {
			preloadedState: {
				dataReducer: MOCK_STATE,
			},
		});
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute(
			"alt",
			"The Modern JavaScript Basics Tutorial by Be Sure Academy volume cover"
		);
		expect(container).toMatchSnapshot();
	});

	it("should render load more button with correct text content", async () => {
		renderWithProviders(<HomePage />, {
			preloadedState: {
				dataReducer: MOCK_STATE,
			},
		});
		expect(screen.getByText("Load more")).toBeInTheDocument();
	});

	it("should render loader instead of load more button when pending", async () => {
		const newState = { ...MOCK_STATE };
		newState.booksData = { ...MOCK_STATE.booksData };
		newState.booksData.loadingStatus = "pending";

		renderWithProviders(<HomePage />, {
			preloadedState: {
				dataReducer: newState,
			},
		});
		const buttons = screen.getAllByRole("button");
		const loaders = screen.getAllByRole("alert");

		expect(loaders.length).toBe(1);
		expect(buttons.length).toBe(1);
		expect(screen.getByRole("button")).not.toHaveTextContent("Load more");
	});

	it("should render `Nothing found` notification instead of content table", async () => {
		const newState = { ...MOCK_STATE };
		newState.booksData = { ...MOCK_STATE.booksData };
		newState.booksData.nothingFound = true;
		newState.booksData.data = { ...MOCK_STATE.booksData.data };
		newState.booksData.data.items = [];

		renderWithProviders(<HomePage />, {
			preloadedState: {
				dataReducer: newState,
			},
		});
		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBe(1);
		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByRole("alert")).toHaveTextContent(
			"Nothing was found"
		);
	});
});
