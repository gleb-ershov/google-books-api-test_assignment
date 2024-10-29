import React from "react";

import {
	updateSearchQueryValue,
	updateSortQueryValue,
} from "src/store/slices/searchFormSlice";
import { useAppDispatch, useAppSelector } from "src/store";

import { CustomButton, CustomInput, CustomSelect } from "src/components/ui";

import { useSubmitForm } from "src/hooks";

import { FORM_SORT_OPTIONS } from "src/config/consts";

import "./SearchForm.styles.css";

const SearchForm = () => {
	const dispatch = useAppDispatch();
	const { searchQuery, sortQuery } = useAppSelector(
		(state) => state.searchFormReducer
	);

	const handleSearchbar = (value: string) =>
		dispatch(updateSearchQueryValue(value));

	const handleSelect = (value: string) =>
		dispatch(updateSortQueryValue(value));

	const { submitForm, isValid } = useSubmitForm({ searchQuery });

	const searchInputLabelClass = `SearchForm_input_label
     ${searchQuery ? "label_content_hidden" : ""}
      ${isValid ? "" : "invalid"}`;

	return (
		<form
			onSubmit={(e) => submitForm(e)}
			className="SearchForm"
			role="form"
		>
			<h1 className="SearchForm_header">Search a book</h1>

			<div className="SearchForm_input_container">
				<label
					htmlFor="searchForm_searchbar"
					className={searchInputLabelClass}
				>
					{isValid ? "Search" : "Search field should not be empty"}
				</label>
				<CustomInput
					required={true}
					type="search"
					id="searchForm_searchbar"
					handler={(val) => handleSearchbar(val)}
					value={searchQuery}
					additionalClass={`focused_searchbar ${
						isValid ? "" : "searchbar_invalid"
					}`}
				/>
			</div>

			<div className="SearchForm_select_container">
				<label htmlFor="searchForm_select" className="SearchForm_label">
					Sort by
				</label>
				<CustomSelect
					id="searchForm_select"
					handler={(val) => handleSelect(val)}
					initialValue={sortQuery}
					options={FORM_SORT_OPTIONS}
				/>
			</div>

			<div className="SearchForm_button_container">
				<CustomButton content="Search" id="searchForm_submit_button" />
			</div>
		</form>
	);
};

export default React.memo(SearchForm);
