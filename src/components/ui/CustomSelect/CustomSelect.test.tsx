import { render, screen } from "@testing-library/react";
import {
	ControllingComponent,
	setupTestWithUserEvent,
} from "src/lib/testUtils";
import CustomSelect from "./CustomSelect";
import { FORM_SORT_OPTIONS } from "src/config/consts";

describe("Custom Select", () => {
	it("should change value on select change event", async () => {
		const { handleEvent, user, value } = setupTestWithUserEvent();

		render(
			<ControllingComponent
				defaultValue={value}
				mockOnChange={handleEvent}
			>
				<CustomSelect
					handler={handleEvent}
					initialValue={value}
					options={FORM_SORT_OPTIONS}
				/>
			</ControllingComponent>
		);

		await user.selectOptions(screen.getByRole("listbox"), "Newest");

		expect(screen.getByRole("listbox")).toHaveValue("Newest");
		expect(handleEvent).toHaveBeenCalled();
	});
});
