import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TransformRotate from "./TransformRotate";
import { TransformRotateProps } from "./TransformRotate";

const defaultProps: TransformRotateProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  isMobile: true,
};

describe("Test TransformRotate component", () => {
  test("it renders", () => {
    // Render the component
    render(<TransformRotate {...defaultProps} />);

    // Assertions
    expect(screen.getByText("Rotate pages")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Keep output as next input")).toBeInTheDocument();
    expect(screen.getByText("Degree angle")).toBeInTheDocument();
    expect(screen.getByText("Page ranges (optional)")).toBeInTheDocument();
  });

  test("handles click on Keep output as next input", async () => {
    // Render the component
    render(<TransformRotate {...defaultProps} />);

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });

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
