import { _apikey, _baseUrl } from "src/config/apiConfig";

export class ResponseError extends Error {
	statusCode = 0;
	info = "";

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = "ResponseError";
		this.statusCode = statusCode;
	}
}

export const urlConstructor = (
	startIndex: number,
	searchQuery: string,
	sortQuery: string = "Relevance"
) => {
	const params = [{ q: searchQuery }, { orderBy: sortQuery }, { startIndex }];
	let _url = `${_baseUrl}?`;
	params.forEach((item) => {
		const key = Object.keys(item)[0];
		_url += key + "=" + item[key as keyof typeof item] + "&";
	});
	_url += `maxResults=30&printType=books&key=${_apikey}`;
	return _url;
};

export const getBooksByQuery = async (
	startIndex: number,
	searchQuery: string,
	sortQuery: string = "Relevance"
) => {
	const requestUrl = urlConstructor(startIndex, searchQuery, sortQuery);

	try {
		const response = await fetch(requestUrl);

		if (!response.ok) {
			throw new ResponseError(
				"An error occured in response",
				response.status
			);
		}
		return await response.json();
	} catch (error) {
		if (error instanceof ResponseError || error instanceof Error) {
			throw error;
		}
		throw new Error("Uncaught error");
	}
};

export const getBooksById = async (bookId: string) => {
	try {
		const response = await fetch(_baseUrl + `/${bookId}`);

		if (!response.ok) {
			throw new ResponseError(
				"An error occured in response",
				response.status
			);
		}
		return await response.json();
	} catch (error) {
		if (error instanceof ResponseError || error instanceof Error) {
			throw error;
		}
		throw new Error("Uncaught error");
	}
};
