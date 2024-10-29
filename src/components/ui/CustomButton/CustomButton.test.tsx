import { render, screen } from "@testing-library/react";
import CustomButton from "./CustomButton";
import userEvent from "@testing-library/user-event";

describe("CustomButton", () => {
	it("should trigger event on button click", async () => {
		const user = userEvent.setup();
		const handleButtonClick = jest.fn();
		render(
			<CustomButton
				handler={() => handleButtonClick()}
				content="Button"
			/>
		);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(button).toHaveTextContent("Button");
		expect(handleButtonClick).toHaveBeenCalled();
	});
});
