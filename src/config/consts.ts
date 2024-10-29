import { IBookData } from "src/types";

export const FORM_SORT_OPTIONS = ["Relevance", "Newest"];

export const VOLUME_MOCK_DATA = {
	kind: "books#volume",
	id: "z7D2DwAAQBAJ",
	etag: "wvi0tv9wXHw",
	selfLink: "https://www.googleapis.com/books/v1/volumes/z7D2DwAAQBAJ",
	volumeInfo: {
		title: "The Modern JavaScript Basics Tutorial",
		subtitle:
			"JavaScript from A to Z : Learn The JavaScript Programming Language Completely From Scratch",
		authors: ["Be Sure Academy"],
		publisher: "Sure Academy",
		publishedDate: "2023-01-15",
		description:
			"JavaScript is the world's most popular programming language. JavaScript is the programming language of the Web. JavaScript is easy to learn. Here we learn JavaScript, starting from scratch and go on to advanced concepts like OOP. You will learn by examples In this book, learning speed is your choice. Everything is up to you. If you are struggling, take a break, or re-read the material. JavaScript is already running in your browser on your computer, on your tablet, and on your smart-phone. JavaScript is free to use for everyone. Start your coding today!",
		readingModes: {
			text: false,
			image: true,
		},
		pageCount: 78,
		printType: "BOOK",
		categories: ["Computers"],
		maturityRating: "NOT_MATURE",
		allowAnonLogging: true,
		contentVersion: "2.2.3.0.preview.1",
		panelizationSummary: {
			containsEpubBubbles: false,
			containsImageBubbles: false,
		},
		imageLinks: {
			smallThumbnail:
				"http://books.google.com/books/content?id=z7D2DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
			thumbnail:
				"http://books.google.com/books/content?id=z7D2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
		},
		language: "en",
		previewLink:
			"http://books.google.com/books?id=z7D2DwAAQBAJ&printsec=frontcover&dq=js&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
		infoLink:
			"http://books.google.com/books?id=z7D2DwAAQBAJ&dq=js&hl=&as_pt=BOOKS&source=gbs_api",
		canonicalVolumeLink:
			"https://books.google.com/books/about/The_Modern_JavaScript_Basics_Tutorial.html?hl=&id=z7D2DwAAQBAJ",
	},
	saleInfo: {
		country: "GE",
		saleability: "NOT_FOR_SALE",
		isEbook: false,
	},
	accessInfo: {
		country: "GE",
		viewability: "PARTIAL",
		embeddable: true,
		publicDomain: false,
		textToSpeechPermission: "ALLOWED",
		epub: {
			isAvailable: false,
		},
		pdf: {
			isAvailable: true,
			acsTokenLink:
				"http://books.google.com/books/download/The_Modern_JavaScript_Basics_Tutorial-sample-pdf.acsm?id=z7D2DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api",
		},
		webReaderLink:
			"http://play.google.com/books/reader?id=z7D2DwAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
		accessViewStatus: "SAMPLE",
		quoteSharingAllowed: false,
	},
	searchInfo: {
		textSnippet:
			"JavaScript is the programming language of the Web. JavaScript is easy to learn. Here we learn JavaScript, starting from scratch and go on to advanced concepts like OOP. You will learn by examples In this book, learning speed is your choice.",
	},
};

export const MOCK_STATE = {
	booksData: {
		data: { items: [VOLUME_MOCK_DATA], totalItems: 1 },
		loadingStatus: "idle" as "idle" | "pending",
		error: null,
		nothingFound: false,
		currentRequestId: "",
	},
	singleBookData: {
		data: null as null | IBookData,
		loadingStatus: "idle" as "idle" | "pending",
		error: null,
	},
};
