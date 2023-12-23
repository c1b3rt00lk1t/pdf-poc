import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FileSelectionProps } from "./FileSelection";
import FileSelection from "./FileSelection";
import userEvent from "@testing-library/user-event";

const defaultProps: FileSelectionProps = {
  files: [],
  setFiles: jest.fn(),
  orderFiles: [0, 1, 2],
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
  // Store the original implementation of createObjectURL
  const originalCreateObjectURL = global.URL.createObjectURL;

  beforeEach(() => {
    // Mock global.URL.createObjectURL
    global.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    // Restore global.URL.createObjectURL to the original implementation
    global.URL.createObjectURL = originalCreateObjectURL;
  });

  test("renders FileSelection component", () => {
    // Render the component
    render(<FileSelection {...defaultProps} />);
  });

  test("renders FileSelection component with files", () => {
    // Render the component
    render(<FileSelection {...defaultProps} files={files} />);

    // Assertions
    expect(screen.getByText("test1.pdf")).toBeInTheDocument();
    expect(screen.getByText("test2.pdf")).toBeInTheDocument();
    expect(screen.getByText("test3.pdf")).toBeInTheDocument();
  });

  test("handle click on reset button", async () => {
    // Render the component
    render(<FileSelection {...defaultProps} files={files} />);

    // Interact with the component
    const resetBtn = screen.getByText("Reset");
    await userEvent.click(resetBtn);

    // Assertion
    expect(defaultProps.handleClickReset).toHaveBeenCalledTimes(1);
  });
});
