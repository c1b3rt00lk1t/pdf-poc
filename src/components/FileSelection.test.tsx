import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FileSelectionProps } from "./FileSelection";
import FileSelection from "./FileSelection";

const defaultProps: FileSelectionProps = {
  files: [],
  setFiles: jest.fn(),
  orderFiles: [],
  setOrderFiles: jest.fn(),
  handleClickReset: jest.fn(),
  action: "combine",
  isMobile: false,
  setBasename: jest.fn(),
};

describe("Test FileSelection component", () => {
  test("renders FileSelection component", () => {
    render(<FileSelection {...defaultProps} />);
  });
});
