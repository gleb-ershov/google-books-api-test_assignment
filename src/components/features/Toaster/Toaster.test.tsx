import userEvent from "@testing-library/user-event";
import { render, renderHook, screen } from "@testing-library/react";

import Toaster from "./Toaster";

import { useToaster } from "src/hooks";

describe("Toaster", () => {
	it("should renders correctly and match snapshot", () => {
		const { result } = renderHook(() => useToaster());
		const closeToaster = result.current.closeToaster;

		const toasterProps = {
			closeToaster,
			message: "Toaster message",
			header: "Toaster Header",
			status: "error" as "error",
		};
		const { container } = render(<Toaster {...toasterProps} />);
		expect(screen.getByText("Toaster Header")).toBeInTheDocument();
		expect(screen.getByText("Toaster message")).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it("should unmount on close action", async () => {
		const { result } = renderHook(() => useToaster());
		let { isToasterVisible } = result.current;
		isToasterVisible = true;

		const toasterProps = {
			closeToaster: () => (isToasterVisible = false),
			message: "Toaster message",
			header: "Toaster Header",
			status: "error" as "error",
		};
		render(<Toaster {...toasterProps} />);
		const btn = screen.getByTestId("toaster_closebutton");
		await userEvent.click(btn);
		expect(isToasterVisible).toBe(false);
	});
});
