import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useState } from "react";

import { splitFiles, downloadFile } from "../utils/pdf-utils";

import TransformSplit, { TransformSplitProps } from "./TransformSplit";

const filesArray = [
  new File(["split content 1"], "split content 1.pdf"),
  new File(["split content 2"], "split content 2.pdf"),
  new File(["split content 3"], "split content 3.pdf"),
];

jest.mock("../utils/pdf-utils", () => ({
  ...jest.requireActual("../utils/pdf-utils"),
  splitFiles: jest
    .fn()
    .mockImplementation(async (_files, _orderFiles, _basename) => {
      return filesArray;
    }),
  downloadFile: jest.fn().mockImplementation((_file, _basename) => {
    return;
  }),
}));

const defaultProps: TransformSplitProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  basename: "basename",
  setBasename: jest.fn(),
  isMobile: true,
};

describe("Test TransformSplit component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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
      return <TransformSplit {...props} />;
    }
    render(<TestWrapper />);

    // Interact with the input text
    const basenameInput = screen.getByRole("textbox", { name: /Base name/i });
    const pageRangesInput = screen.getByRole("textbox", {
      name: /Page ranges/i,
    });

    // Change the input text
    await userEvent.type(basenameInput, "test");
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Assertions
    expect(basenameInput).toHaveValue("basenametest");
    expect(pageRangesInput).toHaveValue("1,2,3-5");

    // Interact with the buttons
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    // Click on the buttons
    await userEvent.click(resetButton);

    // Assertions
    expect(basenameInput).toHaveValue("");
    expect(pageRangesInput).toHaveValue("");
  });

  test("handle click on Split files (download)", async () => {
    // Render the component
    render(<TransformSplit {...defaultProps} />);

    // Interact with the input text
    const pageRangesInput = screen.getByRole("textbox", {
      name: /Page ranges/i,
    });

    // Change the input text
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Interact with the buttons
    const splitButton = screen.getByRole("button", { name: /Split files/i });

    // Click on the buttons
    await userEvent.click(splitButton);

    // Assertions
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(0);
    expect(splitFiles).toHaveBeenCalledTimes(1);
    expect(downloadFile).toHaveBeenCalledTimes(filesArray.length);
  });

  test("handle click on Split files (keep output)", async () => {
    // Render the component
    render(<TransformSplit {...defaultProps} />);

    // Interact with the input text
    const pageRangesInput = screen.getByRole("textbox", {
      name: /Page ranges/i,
    });

    // Change the input text
    await userEvent.type(pageRangesInput, "1,2,3-5");

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });

    // Check the checkbox
    await userEvent.click(checkbox);

    // Interact with the buttons
    const splitButton = screen.getByRole("button", { name: /Split files/i });

    // Click on the buttons
    await userEvent.click(splitButton);

    // Assertions
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(1);
    expect(splitFiles).toHaveBeenCalledTimes(1);
    expect(downloadFile).toHaveBeenCalledTimes(0);
  });
});
