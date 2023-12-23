import { combineFiles } from "./pdf-utils.ts";

describe("combineFiles", () => {
  // Helper function to create a PDF file from content
  const pdfContent = "file content";
  const createPdfFile = (name: string): File => {
    const fileContent = [pdfContent];
    return new File(fileContent, name, {
      type: "application/pdf",
    });
  };

  test("should combine files in the correct order", async () => {
    // Arrange
    // Create a File with content as an array of strings
    const file1 = createPdfFile("file1.pdf");
    const file2 = createPdfFile("file2.pdf");

    const files = [file1, file2];
    const order = [1, 0]; // Swap the order of the files
    const defaultName = "defaultName";
    const expectedOutputFileName = defaultName + " - combined.pdf";

    // Act
    const result = await combineFiles(files, order, defaultName);

    // Assert
    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe(expectedOutputFileName);
  });
});
