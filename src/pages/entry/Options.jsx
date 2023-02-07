import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import AlertBanner from "../common/AlertBanner";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();
    //optionType is scoops or toppings
    axios
      .get(`http://localhost:3030/${optionType}`, {
        signal: controller.signal,
      })
      .then((response) => setItems(response.data))
      .catch((error) => {
        if (error.name !== "CanceledError") setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      ></ItemComponent>
    );
  });

  return (
    <>
      <h1>{title}</h1>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
