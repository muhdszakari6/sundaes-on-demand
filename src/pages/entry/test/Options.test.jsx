import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops"></Options>);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => {
    return element.alt;
  });
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
