import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TransformCombine from "./TransformCombine";
import { TransformCombineProps } from "./TransformCombine";

describe("Test TransformCombine", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test("it renders", () => {
    const props: TransformCombineProps = {
      files: [new File(["hello"], "hello.pdf"), new File(["bye"], "bye.pdf")],
      orderFiles: [1, 0],
      handleKeepOutputAsInput: jest.fn(),
      basename: "basename",
      setBasename: jest.fn(),
      isMobile: true,
    };
    render(<TransformCombine {...props} />);

    // Assertions
    expect(screen.getByText("2 files selected")).toBeInTheDocument();
    expect(screen.getByLabelText("Base name")).toBeInTheDocument();
    expect(screen.getByText("Combine files")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Keep output as next input")
    ).toBeInTheDocument();
  });
});
