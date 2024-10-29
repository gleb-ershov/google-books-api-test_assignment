import { useCallback, useMemo, useState } from "react";

import { IToasterState } from "src/types";

export const useToaster = () => {
	const _delay = 15000;
	const _initialState = useMemo(() => {
		return { header: "", status: "info" as "info", autohide: true };
	}, []);

	const [isToasterVisible, setToasterVisibility] = useState<boolean>(false);
	const [toasterState, setToasterState] =
		useState<IToasterState>(_initialState);

	const closeToaster = useCallback(() => setToasterVisibility(false), []);

	let clearToaster = useCallback(
		(timerId?: NodeJS.Timeout) => {
			setToasterVisibility(false);
			setToasterState(_initialState);

			if (timerId) {
				clearTimeout(timerId);
			}
		},
		[_initialState]
	);

	const showToasterHelper = useCallback(
		(state: IToasterState) => {
			const { header, message, autohide, status } = state;
			setToasterState({ header, message, status, autohide });
			setToasterVisibility(true);
			if (autohide) {
				const timeoutId = setTimeout(() => clearToaster(), _delay);
				return timeoutId;
			}
		},
		[clearToaster]
	);

	const showToaster = useMemo(
		() => ({
			error: (
				message: string,
				header: string = "Error",
				autohide: boolean = true
			) => {
				showToasterHelper({
					message,
					header,
					autohide,
					status: "error",
				});
			},
			info: (
				message: string,
				header: string = "Info",
				autohide: boolean = true
			) => {
				showToasterHelper({
					message,
					header,
					autohide,
					status: "info",
				});
			},
			success: (
				message: string,
				header: string = "Successful",
				autohide: boolean = true
			) => {
				showToasterHelper({
					message,
					header,
					autohide,
					status: "success",
				});
			},
		}),
		[showToasterHelper]
	);

	const toasterProps = {
		...toasterState,
		closeToaster,
	};

	return {
		showToaster,
		closeToaster,
		isToasterVisible,
		toasterState,
		toasterProps,
	};
};
