import { getBooksById, getBooksByQuery, urlConstructor } from "./apiHelpers";

describe("getBooksByQuery", () => {
	test("should return data", async () => {
		const result = await getBooksByQuery(0, "flowers");
		expect(result.items.length).toBe(30);
		expect(result.totalItems).toBeTruthy();
	});
});

describe("getBooksById", () => {
	test("should return data", async () => {
		const mockID = "YVAhAQAAMAAJ";
		const result = await getBooksById(mockID);
		expect(result.id).toBe(mockID);
	});

	test("should throw error if invalid id passed", async () => {
		const mockID = "1";
		await expect(async () => await getBooksById(mockID)).rejects.toThrow();
	});
});

describe("urlConstructor", () => {
	test("should return correct url", () => {
		const result = urlConstructor(0, "flowers");
		console.log(result);
		const targetUrl =
			"https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=Relevance&startIndex=0&maxResults=30&printType=books&key=AIzaSyCvrUoNbctrhVFjh-Q1i8g8vmIK0luDkQk";
		expect(result).toBe(targetUrl);
	});
});
