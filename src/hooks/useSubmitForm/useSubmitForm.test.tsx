import { renderHook, act } from "@testing-library/react";
import { useSubmitForm } from "./useSubmitForm";
import { FormEvent, ReactNode } from "react";
import { Provider } from "react-redux";
import { setupStore } from "src/store";

const mockedStore = setupStore();

const createWrapper = () => {
	return function CreatedWrapper({ children }: { children: ReactNode }) {
		return <Provider store={mockedStore}>{children}</Provider>;
	};
};
const setupUseSubmitFormTest = (searchQuery: string) =>
	renderHook(() => useSubmitForm({ searchQuery }), {
		wrapper: createWrapper(),
	});

const mockedEvent = {
	preventDefault: () => undefined,
} as FormEvent;

describe("useSubmitForm", () => {
	test(`should pass validation if search query is ok`, () => {
		const { result } = setupUseSubmitFormTest("searchQuery");

		act(() => {
			result.current.submitForm(mockedEvent);
		});

		expect(result.current.isValid).toBe(true);
	});

	test(`should NOT pass validation if search query is empty`, () => {
		const { result } = setupUseSubmitFormTest("");

		act(() => {
			result.current.submitForm(mockedEvent);
		});

		expect(result.current.isValid).toBe(false);
	});
});
