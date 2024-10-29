import { Link } from "react-router-dom";

import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
	return (
		<div className={styles.ErrorPage_container}>
			<div className={styles.ErrorPage_wrapper}>
				<p className={styles.ErrorPage_status}>Oops. . .</p>
				<div>
					<p className={styles.ErrorPage_description}>
						Something went wrong
					</p>
					<Link to="/" role="link" className={styles.ErrorPage_link}>
						Back to home page
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
