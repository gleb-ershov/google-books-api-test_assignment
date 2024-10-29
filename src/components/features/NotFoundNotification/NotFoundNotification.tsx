import styles from "./NotFoundNotification.module.css";

const NotFoundNotification = () => {
	return (
		<>
			<div className={styles.NotFoundNotification_container} role="alert">
				<p className={styles.NotFoundNotification_title}>
					Nothing was found
				</p>
				<p className={styles.NotFoundNotification_description}>
					Please try searching for something else
				</p>
			</div>
		</>
	);
};
export default NotFoundNotification;
