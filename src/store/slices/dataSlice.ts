import {
	Action,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";

import { IBookData } from "./../../types";

import {
	getBooksById,
	getBooksByQuery,
	ResponseError,
} from "src/lib/apiHelpers";

export interface IBooksData {
	items: IBookData[];
	totalItems: number;
}

interface IDataState {
	booksData: {
		data: IBooksData;
		loadingStatus: "idle" | "pending";
		error: null | IDataSliceError;
		nothingFound: boolean;
		currentRequestId: string;
	};
	singleBookData: {
		data: IBookData | null;
		loadingStatus: "idle" | "pending";
		error: null | IDataSliceError;
	};
}

const initialState: IDataState = {
	booksData: {
		data: {
			items: [],
			totalItems: 0,
		},
		loadingStatus: "idle",
		nothingFound: false,
		error: null,
		currentRequestId: "",
	},
	singleBookData: {
		data: null,
		loadingStatus: "idle",
		error: null,
	},
};

interface IDataSliceError {
	name: string;
	message: string;
	statusCode?: number;
	stack?: string;
}

interface IGetBooksResult {
	data: IBooksData;
	startIndex: number;
}

const errorPayloadCreator = (error: any) => {
	if (error instanceof ResponseError || error instanceof Error) {
		const payload = {
			...(error instanceof ResponseError && {
				statusCode: error.statusCode,
			}),
			name: error.name,
			message: error.message,
			stack: error.stack,
		};
		return payload;
	}
	return {
		name: "Uncaught Error",
		message: "Something went wrong",
	};
};

export const getBooksData = createAsyncThunk<
	IGetBooksResult | undefined,
	void,
	{ rejectValue: IDataSliceError }
>(
	"booksDataSlice/getBooksData",
	async (_, { getState, rejectWithValue, requestId, signal }) => {
		const state = getState() as RootState;
		console.log("TRIGGERED ACTION");
		const {
			searchQuery,
			sortQuery = "Relevance",
			startIndex,
		} = state.searchFormReducer;
		const currentSQ = searchQuery;
		const { currentRequestId, loadingStatus } = state.dataReducer.booksData;
		console.log(currentRequestId, loadingStatus, requestId);
		// if (loadingStatus === "pending" && currentRequestId !== requestId) {
		// 	console.log("IN RETURN");
		// 	return;
		// }

		if (signal.aborted) {
			return;
		}

		try {
			const result = (await getBooksByQuery(
				startIndex,
				searchQuery,
				sortQuery
			)) as IBooksData;
			return { data: result, startIndex };
		} catch (error) {
			return rejectWithValue(errorPayloadCreator(error));
		}
	}
);

export const getSingleBookData = createAsyncThunk<
	IBookData,
	string,
	{ rejectValue: IDataSliceError }
>("booksDataSlice/getSingleBookData", async (bookId, { rejectWithValue }) => {
	try {
		const result = await getBooksById(bookId);
		return result;
	} catch (error) {
		return rejectWithValue(errorPayloadCreator(error));
	}
});

const booksDataSlice = createSlice({
	name: "booksDataSlice",
	initialState,
	reducers: {},
	selectors: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getBooksData.fulfilled,
				(state, { payload, meta, type }) => {
					const { requestId } = meta;
					console.log("TYPE IS ", type);
					if (payload) {
						if (
							state.booksData.loadingStatus === "pending" &&
							state.booksData.currentRequestId === requestId
						) {
							const {
								data: { items, totalItems },
								startIndex,
							} = payload;
							const previousData = startIndex
								? state.booksData.data.items
								: [];

							const newState = {
								data: {
									items: [...previousData, ...items],
									totalItems,
								},
								nothingFound: payload.data.items.length === 0,
								loadingStatus: "idle" as "idle",
							};
							state.booksData = {
								...state.booksData,
								...newState,
							};
							state.booksData.currentRequestId = "";
						}
					}
				}
			)
			.addCase(getSingleBookData.fulfilled, (state, { payload }) => {
				state.singleBookData.data = payload;
				state.singleBookData.loadingStatus = "idle";
			})
			.addCase(getBooksData.pending, (state, { meta }) => {
				state.booksData.currentRequestId = meta.requestId;
			})
			.addMatcher(
				(action: Action) => action.type.endsWith("pending"),
				(state, action: PayloadAction<string>) => {
					const stateField =
						action.type === "booksDataSlice/getBooksData/pending"
							? "booksData"
							: "singleBookData";
					state[stateField].loadingStatus = "pending";
				}
			)
			.addMatcher(
				(action: Action) => action.type.endsWith("rejected"),
				(state, action: PayloadAction<IDataSliceError>) => {
					const stateField =
						action.type === "booksDataSlice/getBooksData/rejected"
							? "booksData"
							: "singleBookData";
					state[stateField].error = action.payload;
					state[stateField].loadingStatus = "idle";
				}
			);
	},
});

export default booksDataSlice.reducer;
