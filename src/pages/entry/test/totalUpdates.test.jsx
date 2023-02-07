import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoop changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops"></Options>, {
    wrapper: OrderDetailsProvider,
  });

  //make sure total starts out a $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findAllByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput[0]);
  await user.type(vanillaInput[0], "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
});
