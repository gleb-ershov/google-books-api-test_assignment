import { render, screen } from "@testing-library/react";
import CustomInput from "./CustomInput";
import {
	ControllingComponent,
	setupTestWithUserEvent,
} from "src/lib/testUtils";

describe("CustomInput", () => {
	it("should change value on searchbar typing", async () => {
		const { handleEvent, user, value } = setupTestWithUserEvent();

		render(
			<ControllingComponent
				defaultValue={value}
				mockOnChange={handleEvent}
			>
				<CustomInput handler={handleEvent} value={value} />
			</ControllingComponent>
		);

		await user.type(screen.getByRole("search"), "Value is setted");

		expect(screen.getByRole("search")).toHaveValue("Value is setted");
		expect(handleEvent).toHaveBeenCalled();
	});
});
