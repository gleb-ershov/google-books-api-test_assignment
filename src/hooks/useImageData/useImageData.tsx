import {
	bookImageAltConstructor,
	bookImageSrcConstructor,
} from "src/lib/helpers";

interface IUseImageDataArgs {
	src?: string;
	title?: string;
	authors?: string[];
}

export const useImageData = (args: IUseImageDataArgs) => {
	const { src, title, authors } = args;

	const imageSrcAttr = bookImageSrcConstructor(src);

	const imageAltAttr = bookImageAltConstructor(title, authors);
	return [imageSrcAttr, imageAltAttr];
};
