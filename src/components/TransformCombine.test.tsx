import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TransformCombine from "./TransformCombine";
import { TransformCombineProps } from "./TransformCombine";
import * as pdfUtils from "../utils/pdf-utils";
import { useState } from "react";

jest.mock("../utils/pdf-utils", () => ({
  combineFiles: jest
    .fn()
    .mockImplementation(async (_files, _orderFiles, _basename) => {
      return new File(["combined content"], "combined.pdf");
    }),
  downloadFile: jest.fn().mockImplementation((_file, _basename) => {
    return;
  }),
}));

const defaultProps: TransformCombineProps = {
  files: [new File(["hello"], "hello.pdf"), new File(["bye"], "bye.pdf")],
  orderFiles: [1, 0],
  handleKeepOutputAsInput: jest.fn(),
  basename: "basename",
  setBasename: jest.fn().mockImplementation((basename) => {
    return basename;
  }),
  isMobile: true,
};

function renderTransformCombineWithDefaultProps(props: TransformCombineProps) {
  render(<TransformCombine {...props} />);
}

describe("Test TransformCombine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  xtest("it renders", () => {
    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);
    // Assertions
    expect(screen.getByText("2 files selected")).toBeInTheDocument();
    expect(screen.getByLabelText("Base name")).toBeInTheDocument();
    expect(screen.getByText("Combine files")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Keep output as next input")
    ).toBeInTheDocument();
  });

  xtest("handles click on Keep output as next input", async () => {
    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);

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

  xtest("handles click on Combine files button keeping the output", async () => {
    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });
    // Check the checkbox
    await userEvent.click(checkbox);

    // Assertion
    expect(checkbox).toBeChecked();

    // Interact with the component
    await userEvent.click(screen.getByText("Combine files"));

    // Assertion
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(1);
  });

  xtest("handles click on Combine files button downloading the output", async () => {
    // Mock the downloadFile function
    const downloadFileMock = jest.spyOn(pdfUtils, "downloadFile");

    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);

    // Interact with the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /Keep output as next input/i,
    });

    // Assertion
    expect(checkbox).not.toBeChecked();

    // Interact with the component
    await userEvent.click(screen.getByText("Combine files"));

    // Assertions
    expect(defaultProps.handleKeepOutputAsInput).toHaveBeenCalledTimes(0);
    expect(downloadFileMock).toHaveBeenCalledTimes(1);
  });

  xtest("handles click on Reset button", async () => {
    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);

    // Interact with the component
    await userEvent.click(screen.getByText("Reset"));

    // Assertions
    expect(defaultProps.setBasename).toHaveBeenCalledTimes(1);
    expect(defaultProps.setBasename).toHaveBeenCalledWith("");
  });

  test("types new basename (spy)", async () => {
    // Spy on setBasename
    const setBasenameSpy = jest.spyOn(defaultProps, "setBasename");
    // Render the component
    renderTransformCombineWithDefaultProps(defaultProps);

    // Interact with the input
    const input = screen.getByRole("textbox", { name: /Base name/i });
    await userEvent.type(input, "ABCD");

    // Assertion
    expect(setBasenameSpy).toHaveBeenCalledTimes(4);
  });

  test("types new basename (wrapper)", async () => {
    // Render the component
    function TestWrapper() {
      const [basename, setBasename] = useState("basename");
      const props = {
        ...defaultProps,
        basename: basename,
        setBasename: setBasename,
      };
      return <TransformCombine {...props} />;
    }
    render(<TestWrapper />);

    // Interact with the input
    const input = screen.getByRole("textbox", { name: /Base name/i });
    await userEvent.type(input, "ABCD");

    // Assertion
    expect(input).toHaveValue("basenameABCD");
  });
});
