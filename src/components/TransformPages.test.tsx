import { render, screen } from "@testing-library/react";
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
});
