import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "./Header";

describe("Test Header component", () => {
  test("it renders", () => {
    render(<Header />);
  });
});
