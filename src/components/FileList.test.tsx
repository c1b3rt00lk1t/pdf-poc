import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileList from "./FileList";
import { FileListProps } from "./FileList";

const defaultProps: FileListProps = {
  files: [],
  setFiles: jest.fn(),
  orderFiles: [],
  setOrderFiles: jest.fn(),
  showList: true,
  isMobile: false,
};

describe("Test FileList component", () => {
  test("renders FileList component", () => {
    render(<FileList {...defaultProps} />);
  });
});
