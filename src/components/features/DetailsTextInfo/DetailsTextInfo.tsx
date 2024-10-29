import { useEffect, useRef } from "react";

import styles from "./DetailsInfoText.module.css";

interface IDetailsTextInfo {
	volumeInfo: {
		authors?: string[];
		categories?: string[];
		description?: string;
		title: string;
	};
}

const DetailsTextInfo = (props: IDetailsTextInfo) => {
	const {
		volumeInfo: { authors, categories, description, title },
	} = props;
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current && description) {
			ref.current.innerHTML = description.replace(/<br>/g, "");
		}
	}, [description]);

	return (
		<div className={styles.DetailsInfoText_container}>
			<p className={styles.DetailsInfoText_title}>{title}</p>
			<p className={styles.DetailsInfoText_authors}>
				{authors ? `by ${authors}` : "No authors"}
			</p>
			<p
				className={styles.DetailsInfoText_categories}
				data-testid="detailsInfoText-categories"
			>
				{categories ? categories[0] : ""}
			</p>
			<div
				ref={ref}
				className={styles.DetailsInfoText_description}
				data-testid="detailsInfoText-container"
			></div>
		</div>
	);
};

export default DetailsTextInfo;
