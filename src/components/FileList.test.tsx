import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileList from "./FileList";
import { FileListProps } from "./FileList";

describe("Test FileList component", () => {
  const props: FileListProps = {
    files: [],
    setFiles: jest.fn(),
    orderFiles: [],
    setOrderFiles: jest.fn(),
    showList: true,
    isMobile: false,
  };
  test("renders FileList component", () => {
    render(<FileList {...props} />);
  });
});
