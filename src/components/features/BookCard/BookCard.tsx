import React from "react";

import { Link } from "react-router-dom";

import { useImageData } from "src/hooks";

import { IBookData } from "src/types";

import styles from "./BookCard.module.css";

interface IBookCardProps extends IBookData {}

const BookCard = (props: IBookCardProps) => {
	const {
		id,
		volumeInfo: { authors, title, categories, imageLinks },
	} = props;

	const [imageSrc, imageAlt] = useImageData({
		src: imageLinks?.smallThumbnail,
		title,
		authors,
	});

	return (
		<div className={styles.BookCard}>
			<Link
				to={`/${id}`}
				className={styles.BookCard_link_wrapper}
				role="link"
			>
				<div className={styles.BookCard_container}>
					<img
						src={imageSrc}
						alt={imageAlt}
						className={styles.BookCard_book_cover_image}
					/>
					<div className={styles.BookCard_text_info_container}>
						<p className={styles.BookCard_title}>{title}</p>
						<div>
							<p className={styles.BookCard_authors}>
								{authors ? authors.join(", ") : "No author"}
							</p>
							<p className={styles.BookCard_categories}>
								{categories ? categories[0] : null}
							</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default React.memo(BookCard);
