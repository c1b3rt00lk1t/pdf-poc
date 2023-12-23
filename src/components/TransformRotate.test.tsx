import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useState } from "react";

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

  test("changes options and reset (wrapper)", async () => {
    // Render the component
    function TestWrapper() {
      const [basename, setBasename] = useState("basename");
      const props = {
        ...defaultProps,
        basename: basename,
        setBasename: setBasename,
      };
      return <TransformRotate {...props} />;
    }
    render(<TestWrapper />);

    // Interact with the input text
    const pageRangesInput = screen.getByRole("textbox", {
      name: "Page ranges (optional)",
    });
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Assertion
    expect(pageRangesInput).toHaveValue("1,2,3-5");

    // Interact with Reset button
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    await userEvent.click(resetButton);

    //Assertion
    expect(pageRangesInput).toHaveValue("");
  });
});
