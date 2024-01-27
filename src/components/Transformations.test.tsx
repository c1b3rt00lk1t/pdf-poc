import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Transformations from "./Transformations";
import { TransformationsProps } from "./Transformations";

describe("Test Transformations component", () => {
  test("it renders", () => {
    const props: TransformationsProps = {
      action: "combine",
      files: [],
      orderFiles: [],
      handleKeepOutputAsInput: jest.fn(),
      isMobile: true,
      basename: "",
      setBasename: jest.fn(),
      handleClickAction: jest.fn(),
    };
    render(<Transformations {...props} />);
  });

  test("it renders with not empty props", () => {
    const props: TransformationsProps = {
      action: "combine",
      files: [new File(["hello"], "hello.txt")],
      orderFiles: [],
      handleKeepOutputAsInput: jest.fn(),
      isMobile: true,
      basename: "basename",
      setBasename: jest.fn(),
      handleClickAction: jest.fn(),
    };
    render(<Transformations {...props} />);
  });
});
