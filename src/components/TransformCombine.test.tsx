import { render } from "@testing-library/react";
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
  });
});
