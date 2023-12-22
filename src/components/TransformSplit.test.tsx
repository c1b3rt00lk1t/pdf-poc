import { render } from "@testing-library/react";
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
    render(<TransformSplit {...props} />);
  });
});
