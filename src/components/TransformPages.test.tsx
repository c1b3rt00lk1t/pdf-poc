import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TransformPages from "./TransformPages";
import { TransformPagesProps } from "./TransformPages";

describe("Test TransformPages component", () => {
  test("it renders", () => {
    const props: TransformPagesProps = {
      file: new File(["test"], "test.pdf"),
      handleKeepOutputAsInput: jest.fn(),
      isMobile: true,
    };

    render(<TransformPages {...props} />);
  });
});
