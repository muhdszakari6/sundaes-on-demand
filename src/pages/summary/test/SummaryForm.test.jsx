import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial Conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(button).toBeDisabled();
});

test("Checkbox should enable button on first click and disable button on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  const button = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(button).toBeEnabled();
});

test("popover should respond to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm></SummaryForm>);

  const hiddenpopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(hiddenpopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const shownpopover = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(shownpopover).toBeInTheDocument();
});
