import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TransformRotate from "./TransformRotate";
import { TransformRotateProps } from "./TransformRotate";

describe("Test TransformRotate component", () => {
  test("ir renders", () => {
    const props: TransformRotateProps = {
      file: new File(["test"], "test.pdf"),
      handleKeepOutputAsInput: jest.fn(),
      isMobile: true,
    };
    render(<TransformRotate {...props} />);
  });
});
