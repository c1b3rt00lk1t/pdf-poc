import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TransformSplit, { TransformSplitProps } from "./TransformSplit";

const defaultProps: TransformSplitProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  basename: "basename",
  setBasename: jest.fn(),
  isMobile: true,
};

describe("Test TransformSplit component", () => {
  test("it renders", () => {
    // Render the component
    render(<TransformSplit {...defaultProps} />);

    // Assertions
    expect(screen.getByText("Split files")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Keep output as next input")).toBeInTheDocument();
    expect(screen.getByText("Base name")).toBeInTheDocument();
    expect(screen.getByText("Page ranges")).toBeInTheDocument();
  });
  test("handles click on Keep output as next input", async () => {
    // Render the component
    render(<TransformSplit {...defaultProps} />);

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });
    console.log(checkbox);

    // Check the checkbox
    await userEvent.click(checkbox);

    // Assertion
    expect(checkbox).toBeChecked();

    // Uncheck the checkbox
    await userEvent.click(checkbox);

    // Assertion
    expect(checkbox).not.toBeChecked();
  });
});
