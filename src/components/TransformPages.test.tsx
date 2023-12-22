import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {
  // addPageNumbers as addPageNumbersMock,
  addPageDefaultOptions,
  // downloadFile as downloadFileMock,
} from "../utils/pdf-utils";

import TransformPages from "./TransformPages";
import { TransformPagesProps } from "./TransformPages";

jest.mock("../utils/pdf-utils", () => ({
  ...jest.requireActual("../utils/pdf-utils"),
  addPageNumbers: jest
    .fn()
    .mockImplementation(async (_files, _orderFiles, _basename) => {
      return new File(["pages content"], "pages.pdf");
    }),
  downloadFile: jest.fn().mockImplementation((_file, _basename) => {
    return;
  }),
}));

const defaultProps: TransformPagesProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  isMobile: true,
};

describe("Test TransformPages component", () => {
  test("it renders", () => {
    // Render the component
    render(<TransformPages {...defaultProps} />);

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
    render(<TransformPages {...defaultProps} />);

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

  test("changes options and reset", async () => {
    // Render the component
    render(<TransformPages {...defaultProps} />);

    // Change initial page
    const initialPageInput = screen.getByRole("spinbutton", {
      name: /Initial page/i,
    });
    await userEvent.type(initialPageInput, "3");
    expect(initialPageInput).toHaveValue(23);

    // Change start number
    const startNumberInput = screen.getByRole("spinbutton", {
      name: /Start number/i,
    });
    await userEvent.type(startNumberInput, "3");
    expect(startNumberInput).toHaveValue(23);

    // Change horizontal alignment
    const xPositionSelect = screen.getByRole("combobox", {
      name: /Horizontal alignment/i,
    });
    await userEvent.selectOptions(xPositionSelect, "right");
    expect(xPositionSelect).toHaveValue("right");

    // Change font size
    const fontSizeInput = screen.getByRole("spinbutton", {
      name: /Font size/i,
    });
    await userEvent.type(fontSizeInput, "3");
    expect(fontSizeInput).toHaveValue(123);

    // Change font
    const fontSelect = screen.getByRole("combobox", {
      name: /Font/i,
    });
    await userEvent.selectOptions(fontSelect, "Times-Roman");
    expect(fontSelect).toHaveValue("Times-Roman");

    // Click Reset button
    await userEvent.click(screen.getByText("Reset"));

    // Assertions
    expect(initialPageInput).toHaveValue(addPageDefaultOptions.initialPage);
    expect(startNumberInput).toHaveValue(addPageDefaultOptions.startNumber);
    expect(xPositionSelect).toHaveValue(addPageDefaultOptions.xPosition);
    expect(fontSizeInput).toHaveValue(addPageDefaultOptions.fontSize);
    expect(fontSelect).toHaveValue(addPageDefaultOptions.fontType);
  });
});
