import { useEffect, useLayoutEffect, useMemo } from "react";

import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "src/store";
import { getSingleBookData } from "src/store/slices/dataSlice";

import { useToaster } from "src/hooks";
import { useImageData } from "src/hooks/useImageData/useImageData";

import { DetailsTextInfo, Toaster } from "src/components/features";
import { LoaderSpinner } from "src/components/ui";

import styles from "./DetailsPage.module.css";

const DetailsPage = () => {
	let { id: bookId } = useParams();
	const dispatch = useAppDispatch();

	const { data, loadingStatus, error } = useAppSelector(
		(state) => state.dataReducer.singleBookData
	);

	const [imageSrc, imageAlt] = useImageData({
		src: data?.volumeInfo.imageLinks.smallThumbnail,
		title: data?.volumeInfo.title,
		authors: data?.volumeInfo.authors,
	});

	const { showToaster, toasterProps, isToasterVisible } = useToaster();
	const memoizedError = useMemo(() => error, [error]);

	useEffect(() => {
		if (memoizedError) {
			showToaster.error(memoizedError.message, memoizedError.name);
		}
	}, [memoizedError, showToaster]);

	useLayoutEffect(() => {
		if (bookId) {
			dispatch(getSingleBookData(bookId));
		}
	}, [bookId]);

	const toaster = isToasterVisible && <Toaster {...toasterProps} />;
	const isPending = loadingStatus === "pending";

	const pageContent =
		!isPending && data ? (
			<div className={styles.DetailsPage_content_container}>
				<img
					src={imageSrc}
					alt={imageAlt}
					className={styles.DetailsPage_content_image}
				/>
				<DetailsTextInfo {...data} />
			</div>
		) : null;

	const loaderSpinner = isPending ? (
		<div className="LoaderSpinner_container">
			<LoaderSpinner />
		</div>
	) : null;

	return (
		<>
			{toaster}
			{pageContent}
			{loaderSpinner}
		</>
	);
};

export default DetailsPage;
