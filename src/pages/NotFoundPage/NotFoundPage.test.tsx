import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import userEvent from "@testing-library/user-event";

describe("Not Found Page", () => {
	it("should have correct href value and redirect on link click", async () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		expect(screen.getByRole("link")).toBeInTheDocument();
		expect(screen.getByRole("link")).toHaveAttribute("href", `/`);
		await userEvent.click(screen.getByRole("link"));
		expect(window.location.pathname).toBe(`/`);
	});
});
