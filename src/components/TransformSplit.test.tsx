import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TransformSplit, { TransformSplitProps } from "./TransformSplit";

const props: TransformSplitProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  basename: "basename",
  setBasename: jest.fn(),
  isMobile: true,
};

describe("Test TransformSplit component", () => {
  test("it renders", () => {
    // Render the component
    render(<TransformSplit {...props} />);

    // Assertions
    expect(screen.getByText("Split files")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Keep output as next input")).toBeInTheDocument();
    expect(screen.getByText("Base name")).toBeInTheDocument();
    expect(screen.getByText("Page ranges")).toBeInTheDocument();
  });
});
