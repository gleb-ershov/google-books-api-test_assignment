import { renderHook, act } from "@testing-library/react";
import { useToaster } from "./useToaster";
describe("useToaster", () => {
	test(`should create visible "error" toaster with correct state`, () => {
		const { result } = renderHook(() => useToaster());
		const mockedError = {
			name: "Type Error",
			message: "Error message",
		};

		act(() => {
			result.current.showToaster.error(
				mockedError.message,
				mockedError.name
			);
		});

		expect(result.current.toasterState).toStrictEqual({
			header: "Type Error",
			message: "Error message",
			status: "error",
			autohide: true,
		});
		expect(result.current.isToasterVisible).toBe(true);
	});

	test(`should create visible "info" toaster with correct state`, () => {
		const { result } = renderHook(() => useToaster());
		const mockedNotification = {
			message: "Notification message",
		};

		act(() => {
			result.current.showToaster.info(
				mockedNotification.message,
				undefined,
				false
			);
		});

		expect(result.current.toasterState).toStrictEqual({
			header: "Info",
			message: "Notification message",
			status: "info",
			autohide: false,
		});
		expect(result.current.isToasterVisible).toBe(true);
	});

	test(`should create visible "success" toaster with correct state`, () => {
		const { result } = renderHook(() => useToaster());
		const mockedSuccess = {
			message: "Success message",
		};

		act(() => {
			result.current.showToaster.success(
				mockedSuccess.message,
				undefined
			);
		});

		expect(result.current.toasterState).toStrictEqual({
			header: "Successful",
			message: "Success message",
			status: "success",
			autohide: true,
		});
		expect(result.current.isToasterVisible).toBe(true);
	});
});
