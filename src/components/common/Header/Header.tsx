import { Link, useLocation } from "react-router-dom";

import { GoogleIcon } from "src/components/icons";

import styles from "./Header.module.css";

const Header = () => {
	const location = useLocation();
	return (
		<header className={styles.Header}>
			<GoogleIcon width="32px" height="32px" />
			<h1 className={styles.Header_logo}>Google Books APIs</h1>
			{location.pathname !== "/" ? (
				<Link to="/" role="link" className={styles.Header_link}>
					Back to home page
				</Link>
			) : null}
		</header>
	);
};
export default Header;
