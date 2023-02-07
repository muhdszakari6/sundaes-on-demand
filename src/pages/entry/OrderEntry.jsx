import Options from "./Options";

import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderEntry = () => {
    const { totals } = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops"></Options>
      <Options optionType="toppings"></Options>
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </div>
  );
};

export default OrderEntry;
