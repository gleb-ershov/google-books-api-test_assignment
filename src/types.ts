export interface IBookData {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publishedDate: string;
		description: string;
		pageCount: number;
		printType: string;
		categories?: string[];
		imageLinks: {
			smallThumbnail?: string;
			thumbnail?: string;
			small?: string;
			medium?: string;
			large?: string;
			extraLarge?: string;
		};
		[key: string]: any;
	};
	[key: string]: any;
}

export interface IIconProps {
	width: string;
	height: string;
	color?: string;
}

type TToasterStatus = "error" | "info" | "success";

export interface IToasterState {
	header: string;
	message?: string;
	status: TToasterStatus;
	autohide?: boolean;
}
