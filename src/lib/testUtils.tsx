import React, { PropsWithChildren, ReactElement, useState } from "react";

import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "src/store";

import { BrowserRouter, MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

interface IExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
}

interface IExtendedRenderOptionsWithRouter extends IExtendedRenderOptions {
	routerType?: string;
	initialEntries?: string[];
	initialIndex?: number;
}

export function renderWithProviders(
	ui: React.ReactElement,
	extendedRenderOptions: IExtendedRenderOptionsWithRouter = {}
) {
	const {
		preloadedState = {},
		routerType = "browser",
		initialEntries,
		initialIndex,
		store = setupStore(preloadedState),
		...renderOptions
	} = extendedRenderOptions;

	interface IWrapper extends PropsWithChildren {
		locationValue?: string[];
	}

	const Wrapper = ({ children }: IWrapper) => (
		<Provider store={store}>
			{routerType === "browser" ? (
				<BrowserRouter>{children}</BrowserRouter>
			) : (
				<MemoryRouter initialEntries={initialEntries}>
					{children}
				</MemoryRouter>
			)}
		</Provider>
	);

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}

interface IControllingComponent extends PropsWithChildren {
	defaultValue: string;
	mockOnChange: jest.Mock<void, [str: string]>;
}

export const ControllingComponent = (props: IControllingComponent) => {
	const { defaultValue, mockOnChange, children } = props;
	const [value, setValue] = useState(defaultValue);
	mockOnChange.mockImplementation((v) => setValue(v));

	return (
		<>
			{children
				? React.cloneElement(children as ReactElement, {
						value,
						handler: mockOnChange,
				  })
				: null}
		</>
	);
};

export const setupTestWithUserEvent = () => {
	const user = userEvent.setup();
	let value = "";
	const handleEvent = jest.fn();

	return { user, handleEvent, value };
};
