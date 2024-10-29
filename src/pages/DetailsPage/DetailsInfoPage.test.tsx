import { renderWithProviders } from "src/lib/testUtils";
import DetailsPage from "./DetailsPage";
import { MOCK_STATE, VOLUME_MOCK_DATA } from "src/config/consts";
import { screen } from "@testing-library/react";

describe("DetailsPage", () => {
	it("should renders correctly if loading status is idle", async () => {
		const newState = { ...MOCK_STATE };
		newState.singleBookData = { ...MOCK_STATE.singleBookData };
		newState.singleBookData.data = VOLUME_MOCK_DATA;
		const {
			volumeInfo: { title, authors },
		} = newState.singleBookData.data;

		const imageAlt =
			`${title}` +
			`${authors ? ` by ${authors.join(", ")}` : ""}` +
			" volume cover";
		const bookTitle = newState.singleBookData.data.volumeInfo.title;

		const { container } = renderWithProviders(<DetailsPage />, {
			preloadedState: {
				dataReducer: newState,
			},
		});

		expect(container).toMatchSnapshot();
		expect(screen.getByText(bookTitle)).toBeInTheDocument();
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute("alt", imageAlt);
	});

	it("should render loader if loading status is pending", async () => {
		const newState = { ...MOCK_STATE };
		newState.singleBookData = { ...MOCK_STATE.singleBookData };
		newState.singleBookData.loadingStatus = "pending";

		renderWithProviders(<DetailsPage />, {
			preloadedState: {
				dataReducer: newState,
			},
		});
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});
});
