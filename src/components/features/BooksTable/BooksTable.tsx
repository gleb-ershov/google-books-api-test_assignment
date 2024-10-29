import React, { useMemo } from "react";

import { useAppSelector } from "src/store";

import BookCard from "../BookCard";

import { IBookData } from "src/types";

import styles from "./BooksTable.module.css";

const BooksTable = () => {
	const {
		data: { items },
	} = useAppSelector((state) => state.dataReducer.booksData);
	const booksList = useMemo(
		() =>
			items.map((item: IBookData) => (
				<BookCard key={`Volume: ${item.id}`} {...item} />
			)),
		[items]
	);

	return <div className={styles.BooksTable_table}>{booksList}</div>;
};

export default React.memo(BooksTable);
