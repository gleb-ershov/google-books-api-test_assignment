export const bookImageAltConstructor = (title?: string, authors?: string[]) => {
	return `${title} ${authors ? `by ${authors.join(", ")} ` : ""}volume cover`;
};

export const bookImageSrcConstructor = (
	src?: string,
	width: string | number = 150,
	height: string | number = 230
) => {
	return src || `https://placehold.co/${width}x${height}}`;
};
