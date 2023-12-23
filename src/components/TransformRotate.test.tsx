import { render, screen } from "@testing-library/react";
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
    // Rednder the component
    render(<TransformRotate {...defaultProps} />);

    // Assertions
    expect(screen.getByText("Rotate pages")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Keep output as next input")).toBeInTheDocument();
    expect(screen.getByText("Degree angle")).toBeInTheDocument();
    expect(screen.getByText("Page ranges (optional)")).toBeInTheDocument();
  });
});
