import { FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "src/store";
import { getBooksData } from "src/store/slices/dataSlice";
import { updateStartIndexValue } from "src/store/slices/searchFormSlice";

interface IUseSubmitFormArgs {
	searchQuery: string;
}

export const useSubmitForm = (args: IUseSubmitFormArgs) => {
	const [isValid, setValidation] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const submitForm = useCallback(
		(e: FormEvent) => {
			const { searchQuery } = args;

			e.preventDefault();
			if (!(searchQuery.length === 0)) {
				setValidation(true);
				dispatch(updateStartIndexValue(0));
				dispatch(getBooksData());
			} else {
				setValidation(false);
				setTimeout(() => setValidation(true), 5000);
			}
		},
		[dispatch, args]
	);

	return { isValid, submitForm };
};
