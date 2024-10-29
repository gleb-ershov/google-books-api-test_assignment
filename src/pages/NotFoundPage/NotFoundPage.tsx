import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
	return (
		<div className={styles.NotFoundPage_container}>
			<div className={styles.NotFoundPage_wrapper}>
				<p className={styles.NotFoundPage_status}>404</p>
				<div>
					<p className={styles.NotFoundPage_description}>
						Page not found
					</p>
					<Link
						to="/"
						role="link"
						className={styles.NotFoundPage_link}
					>
						Back to home page
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
