import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FORM_SORT_OPTIONS } from "src/config/consts";

interface IFormInitialState {
	searchQuery: string;
	sortQuery: string;
	startIndex: number;
}

const initialState: IFormInitialState = {
	searchQuery: "",
	sortQuery: FORM_SORT_OPTIONS[0],
	startIndex: 0,
};

const searchFormSlice = createSlice({
	name: "searchFormSlice",
	initialState,
	reducers: {
		updateSearchQueryValue: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		updateSortQueryValue: (state, action: PayloadAction<string>) => {
			state.sortQuery = action.payload;
		},
		updateStartIndexValue: (state, action: PayloadAction<number>) => {
			state.startIndex = action.payload;
		},
	},
});

export default searchFormSlice.reducer;

export const {
	updateSearchQueryValue,
	updateSortQueryValue,
	updateStartIndexValue,
} = searchFormSlice.actions;
