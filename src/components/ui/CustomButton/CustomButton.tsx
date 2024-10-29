import { PropsWithChildren, ReactNode } from "react";

import styles from "./CustomButton.module.css";

interface IButtonProps extends PropsWithChildren {
	content: string | ReactNode;
	handler?: () => void;
	id?: string;
	additionalClass?: string;
	disabled?: boolean;
}

const CustomButton = (props: IButtonProps) => {
	const {
		content,
		id,
		additionalClass = "",
		handler,
		disabled = false,
	} = props;

	const className = `${styles.CustomButton} ${additionalClass}`;

	return (
		<button
			className={className}
			id={id}
			onClick={handler}
			disabled={disabled}
			role='button'
		>
			{content}
		</button>
	);
};

export default CustomButton;
