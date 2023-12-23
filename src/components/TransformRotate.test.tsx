import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useState } from "react";

import { rotatePages, downloadFile } from "../utils/pdf-utils";

import TransformRotate from "./TransformRotate";
import { TransformRotateProps } from "./TransformRotate";

jest.mock("../utils/pdf-utils", () => ({
  ...jest.requireActual("../utils/pdf-utils"),
  rotatePages: jest
    .fn()
    .mockImplementation(async (_files, _orderFiles, _basename) => {
      return new File(["test"], "test.pdf");
    }),
  downloadFile: jest.fn().mockImplementation((_file, _basename) => {
    return;
  }),
}));

const defaultProps: TransformRotateProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  isMobile: true,
};

describe("Test TransformRotate component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  test("handle click on Rotate pages button (download)", async () => {
    // Render the component
    render(<TransformRotate {...defaultProps} />);

    // Interact with the input text
    const pageRangesInput = screen.getByRole("textbox", {
      name: "Page ranges (optional)",
    });
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Interact with the button
    const rotatePagesButton = screen.getByRole("button", {
      name: /Rotate pages/i,
    });
    await userEvent.click(rotatePagesButton);

    // Assertions
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(0);
    expect(rotatePages).toHaveBeenCalledTimes(1);
    expect(downloadFile).toHaveBeenCalledTimes(1);
  });

  test("handle click on Rotate pages button (keep output as input)", async () => {
    // Render the component
    render(<TransformRotate {...defaultProps} />);

    // Interact with the input text
    const pageRangesInput = screen.getByRole("textbox", {
      name: "Page ranges (optional)",
    });
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });
    await userEvent.click(checkbox);

    // Interact with the button
    const rotatePagesButton = screen.getByRole("button", {
      name: /Rotate pages/i,
    });
    await userEvent.click(rotatePagesButton);

    // Assertions
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(1);
    expect(rotatePages).toHaveBeenCalledTimes(1);
    expect(downloadFile).toHaveBeenCalledTimes(0);
  });
});
