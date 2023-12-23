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

const files = [
  new File(["test"], "test1.pdf"),
  new File(["test"], "test2.pdf"),
  new File(["test"], "test3.pdf"),
];

describe("Test FileList component", () => {
  // Store the original implementation of createObjectURL
  const originalCreateObjectURL = global.URL.createObjectURL;

  beforeEach(() => {
    // Mock global.URL.createObjectURL
    global.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    // Restore global.URL.createObjectURL to the original implementation
    global.URL.createObjectURL = originalCreateObjectURL;
  });
  test("renders FileList component", () => {
    // Render the component
    render(<FileList {...defaultProps} />);
  });

  test("renders FileList component with files", () => {
    // Render the component
    render(<FileList {...defaultProps} files={files} />);
  });
});
