import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

test("update toppings subtotal when topping is selected", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings"></Options>);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  expect(cherriesCheckbox).toBeInTheDocument();
  expect(cherriesCheckbox.checked).toBeFalsy();

  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox.checked).toBeTruthy();
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
describe("Grand total", () => {
  test("grand total starts at 0", () => {
    const {unmount} = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount()
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });

    //Add vanilla scoops and check grand total
    const vanillaInput = await screen.findAllByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput[0]);
    await user.type(vanillaInput[0], "3");
    expect(grandTotal).toHaveTextContent("6.00");

    //Add cherries toppings and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox.checked).toBeFalsy();
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("7.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });
    //Add cherries toppings and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(cherriesCheckbox.checked).toBeFalsy();
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    //Add vanilla scoops and check grand total
    const vanillaInput = await screen.findAllByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput[0]);
    await user.type(vanillaInput[0], "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findAllByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput[0]);
    await user.type(vanillaInput[0], "3");

    //remove 1 scoop of vanilla
    await user.clear(vanillaInput[0]);
    await user.type(vanillaInput[0], "1");

    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
