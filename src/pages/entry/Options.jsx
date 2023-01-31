import axios from "axios";
import { response } from "msw";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    //optionType is scoops or toppings
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO : Handle Error Response
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      ></ItemComponent>
    );
  });

  return <Row>{optionItems}</Row>;
};

export default Options;
