import { PropsWithChildren } from "react";

import styles from "./CustomInput.module.css";

interface IInputProps extends PropsWithChildren {
	handler: (arg: string) => void;
	value: string;
	id?: string;
	placeholder?: string;
	additionalClass?: string;
	type?: string;
	required?: boolean;
}

const CustomInput = (props: IInputProps) => {
	const {
		placeholder = "",
		value,
		id,
		additionalClass = "",
		handler,
		type = "text",
		required = false,
	} = props;
	const className = `${styles.CustomInput} ${additionalClass}`;

	return (
		<input
			role="search"
			type={type}
			className={className}
			id={id}
			onChange={(e) => handler(e.target.value)}
			placeholder={placeholder}
			value={value}
			required={required}
		/>
	);
};

export default CustomInput;
