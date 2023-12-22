import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TransformPages from "./TransformPages";
import { TransformPagesProps } from "./TransformPages";

const defaultrops: TransformPagesProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  isMobile: true,
};

describe("Test TransformPages component", () => {
  test("it renders", () => {
    // Render the component
    render(<TransformPages {...defaultrops} />);

    // Assertions
    expect(screen.getByText("Add numbers")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Keep output as next input")).toBeInTheDocument();
    expect(screen.getByLabelText("Font size")).toBeInTheDocument();
    expect(screen.getByLabelText("Font")).toBeInTheDocument();
    expect(screen.getByText("Horizontal alignment")).toBeInTheDocument();
    expect(screen.getByText("Bottom margin (cm)")).toBeInTheDocument();
    expect(screen.getByText("Initial page")).toBeInTheDocument();
    expect(screen.getByText("Start number")).toBeInTheDocument();
  });
  test("handles click on Keep output as next input", async () => {
    // Render the component
    render(<TransformPages {...defaultrops} />);

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
