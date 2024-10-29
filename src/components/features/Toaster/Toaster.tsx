import { IToasterState } from "src/types";

import { XIcon } from "src/components/icons";

import styles from "./Toaster.module.css";

interface IToasterProps extends IToasterState {
	closeToaster: () => void;
}

const Toaster = (props: IToasterProps) => {
	const { message, header, closeToaster } = props;

	return (
		<>
			<div role="alert" className={styles.Toaster_container}>
				<div className={styles.Toaster_title_container}>
					<span className={styles.Toaster_title}>{header}</span>
					<div
						className={styles.Toaster_closeButton_container}
						onClick={() => closeToaster()}
						data-testid="toaster_closebutton"
					>
						<XIcon width="36px" height="36px" />
					</div>
				</div>
				<p className={styles.Toaster_message}>{message}</p>
			</div>
		</>
	);
};

export default Toaster;
