import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import dataReducer from "./slices/dataSlice";
import searchFormReducer from "./slices/searchFormSlice";

const rootReducer = combineReducers({
	dataReducer,
	searchFormReducer,
});

export const store = configureStore({
	reducer: {
		dataReducer,
		searchFormReducer,
	},
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
