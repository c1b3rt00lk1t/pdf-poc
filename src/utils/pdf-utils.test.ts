import { combineFiles } from "./pdf-utils.ts";

describe("combineFiles", () => {
  test("should combine files in the correct order", async () => {
    // Arrange
    const pdfContent = "file1 content"; // Replace this with your actual PDF content

    // Create a File with content as an array of strings
    const fileContent = [pdfContent];
    const file1 = new File(fileContent, "file1.pdf", {
      type: "application/pdf",
    });
    const file2 = new File(fileContent, "file2.pdf", {
      type: "application/pdf",
    });

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
