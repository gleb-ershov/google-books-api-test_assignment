import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "src/store";
import { getBooksData } from "src/store/slices/dataSlice";
import { updateStartIndexValue } from "src/store/slices/searchFormSlice";

import { useToaster } from "src/hooks";

import {
	SearchForm,
	BooksTable,
	Toaster,
	NotFoundNotification,
} from "src/components/features";
import { CustomButton, LoaderSpinner } from "src/components/ui";

import styles from "./HomePage.module.css";

const HomePage = () => {
	const { startIndex: currentIndex } = useAppSelector(
		(state) => state.searchFormReducer
	);

	const {
		loadingStatus,
		data: { items },
		nothingFound,
		error,
	} = useAppSelector((state) => state.dataReducer.booksData);

	const memoizedError = useMemo(() => error, [error]);
	const dispatch = useAppDispatch();

	const loadMoreHandler = () => {
		dispatch(updateStartIndexValue(currentIndex + 30));
		dispatch(getBooksData());
	};

	const { showToaster, toasterProps, isToasterVisible } = useToaster();

	useEffect(() => {
		if (memoizedError) {
			showToaster.error(memoizedError.message, memoizedError.name);
		}
	}, [memoizedError, showToaster]);

	const isPending = loadingStatus === "pending";

	const notFoundNotification = nothingFound && !isPending && (
		<NotFoundNotification />
	);

	const booksTable =
		(!isPending && items) || (isPending && items && currentIndex > 0) ? (
			<BooksTable />
		) : null;

	const loadingIndicator = isPending && <LoaderSpinner />;

	const toaster = isToasterVisible && <Toaster {...toasterProps} />;

	const loadMoreButton =
		items.length && !isPending ? (
			<CustomButton
				handler={() => loadMoreHandler()}
				content="Load more"
			/>
		) : null;

	const loadMoreLoadingIndicator =
		items.length && isPending && currentIndex ? <LoaderSpinner /> : null;

	return (
		<>
			{toaster}
			<SearchForm />
			{notFoundNotification}
			{loadingIndicator}
			{booksTable}
			<div className={styles.HomePage_loadMoreButton_container}>
				{loadMoreLoadingIndicator}
				{loadMoreButton}
			</div>
		</>
	);
};

export default HomePage;
