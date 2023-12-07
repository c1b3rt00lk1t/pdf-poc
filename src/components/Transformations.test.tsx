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
    };
    render(<Transformations {...props} />);
  });
});
