import { Outlet } from "react-router";

import { Footer, Header } from "src/components/common";

import styles from "./Layout.module.css";

const Layout = () => {
	return (
		<div className={styles.Layout_container}>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
