import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../__mocks__/matchMedia.mock";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const title = screen.getByText(/PDF Utils/i);
    expect(title).toBeInTheDocument();
  });
});
