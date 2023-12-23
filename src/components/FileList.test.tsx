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

  test("renders FileList component with files and orderFiles", () => {
    // Render the component
    render(<FileList {...defaultProps} files={files} orderFiles={[1, 2, 0]} />);

    // Check if the files are in the right order
    const list = document.querySelector("ul")!;
    const items = list.querySelectorAll("li");
    expect(items.length).toBe(3);
    expect(items[0].querySelector("a")!.textContent).toBe("test2.pdf");
    expect(items[1].querySelector("a")!.textContent).toBe("test3.pdf");
    expect(items[2].querySelector("a")!.textContent).toBe("test1.pdf");
  });
});
