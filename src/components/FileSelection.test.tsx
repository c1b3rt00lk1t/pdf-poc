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

const files = [
  new File(["test"], "test1.pdf"),
  new File(["test"], "test2.pdf"),
  new File(["test"], "test3.pdf"),
];

describe("Test FileSelection component", () => {
  test("renders FileSelection component", () => {
    // Render the component
    render(<FileSelection {...defaultProps} />);
  });
  test("renders FileSelection component with files", () => {
    // Render the component
    render(<FileSelection {...defaultProps} files={files} />);
  });
});
