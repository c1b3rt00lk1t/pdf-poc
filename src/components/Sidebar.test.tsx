import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Sidebar from "./Sidebar";
import { SidebarProps } from "./Sidebar";

describe("Test Sidebar component", () => {
  const props: SidebarProps = {
    handleClickAction: jest.fn(),
    action: "combine",
    isMobile: true,
  };
  test("it renders", () => {
    render(<Sidebar {...props} />);
  });
});
