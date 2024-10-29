import { renderWithProviders } from "src/lib/testUtils";
import SearchForm from "./SearchForm";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

const FORM_STATE_MOCK = {
	searchQuery: "value",
	sortQuery: "Relevance",
	startIndex: 0,
};

const state = {
	preloadedState: {
		searchFormReducer: FORM_STATE_MOCK,
	},
};

const submitTestsSetup = () => {
	const user = userEvent.setup();
	renderWithProviders(<SearchForm />, state);
	const searchForm = screen.getByRole("form");
	const handleOnSubmitMock = jest.fn();
	searchForm.onsubmit = handleOnSubmitMock;

	return { user, handleOnSubmitMock };
};

describe("SearchForm", () => {
	it("should renders with correct values", () => {
		renderWithProviders(<SearchForm />, state);

		const searchbar = screen.getByRole("search");
		const select = screen.getByRole("listbox");

		expect(searchbar).toBeInTheDocument();
		expect(searchbar).toHaveValue("value");

		expect(select).toBeInTheDocument();
		expect(select).toHaveValue("Relevance");

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should change value on searchbar typing", async () => {
		const user = userEvent.setup();
		const newMockState = FORM_STATE_MOCK;
		newMockState.searchQuery = "";

		renderWithProviders(<SearchForm />, {
			preloadedState: {
				searchFormReducer: newMockState,
			},
		});
		const searchbar = screen.getByRole("search");
		await user.type(searchbar, "value is setted");

		expect(searchbar).toHaveValue("value is setted");
	});

	it("should change value on select change", async () => {
		const user = userEvent.setup();
		renderWithProviders(<SearchForm />, state);

		const select = screen.getByRole("listbox");
		await user.selectOptions(select, "Newest");
		expect(select).toHaveValue("Newest");
	});

	it("should trigger submit on button click", async () => {
		const { user, handleOnSubmitMock } = submitTestsSetup();
		const submitButton = screen.getByRole("button");

		await user.click(submitButton);
		expect(handleOnSubmitMock).toHaveBeenCalled();
	});

	it("should trigger submit on Enter keydown while searchbar is in focus", async () => {
		const { user, handleOnSubmitMock } = submitTestsSetup();
		const searchbar = screen.getByRole("search");
		await user.type(searchbar, "abc{enter}");
		expect(handleOnSubmitMock).toHaveBeenCalled();
	});
});
