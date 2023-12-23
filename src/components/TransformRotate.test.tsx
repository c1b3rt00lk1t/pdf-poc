import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TransformRotate from "./TransformRotate";
import { TransformRotateProps } from "./TransformRotate";

const defaultProps: TransformRotateProps = {
  file: new File(["test"], "test.pdf"),
  handleKeepOutputAsInput: jest.fn(),
  isMobile: true,
};

describe("Test TransformRotate component", () => {
  test("ir renders", () => {
    render(<TransformRotate {...defaultProps} />);
  });
});
