import { render } from "@testing-library/react";
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
    render(<TransformPages {...defaultrops} />);
  });
});
