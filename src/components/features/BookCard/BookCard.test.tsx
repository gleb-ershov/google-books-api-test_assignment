import { VOLUME_MOCK_DATA } from "src/config/consts";
import BookCard from "./BookCard";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "src/lib/testUtils";
import { screen } from "@testing-library/react";

describe("BookCard", () => {
	it("should renders correctly and have correct alt attribute on <img />", async () => {
		renderWithProviders(<BookCard {...VOLUME_MOCK_DATA} />);
		const { title, authors } = VOLUME_MOCK_DATA.volumeInfo;
		const imageAltAttr =
			`${title}` +
			`${authors ? ` by ${authors.join(", ")}` : ""}` +
			" volume cover";

		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.getByRole("img")).toHaveAttribute("alt", imageAltAttr);
		expect(screen.getByRole("link")).toBeInTheDocument();
	});

	it("should have correct href value and redirect on link click", async () => {
		const user = userEvent.setup();
		renderWithProviders(<BookCard {...VOLUME_MOCK_DATA} />);

		const linkElement = screen.getByRole("link");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", `/${VOLUME_MOCK_DATA.id}`);
		await user.click(linkElement);
		expect(window.location.pathname).toBe(`/${VOLUME_MOCK_DATA.id}`);
	});
});
