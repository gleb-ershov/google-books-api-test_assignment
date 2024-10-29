import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import userEvent from "@testing-library/user-event";

describe("Error Page", () => {
	it("should have correct href value and redirect on link click", async () => {
		render(
			<BrowserRouter>
				<ErrorPage />
			</BrowserRouter>
		);

		expect(screen.getByRole("link")).toBeInTheDocument();
		expect(screen.getByRole("link")).toHaveAttribute("href", `/`);
		await userEvent.click(screen.getByRole("link"));
		expect(window.location.pathname).toBe(`/`);
	});
});
