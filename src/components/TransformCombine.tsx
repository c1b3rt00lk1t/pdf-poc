import { PDFDocument } from "pdf-lib";

interface TransformCombineProps {
  files: File[];
}
const TransformCombine = ({ files }: TransformCombineProps) => {
  // combineFiles will combine the pdf files that the user has selected
  // it will use the pdf-lib library
  // the output file will be a file that contains all the pages of the input files
  async function combineFiles(files: File[]) {
    const outputDoc = await PDFDocument.create();

    const orderedFiles = [...files].sort((a, b) => (a.name > b.name ? 1 : -1));

    for (const file of orderedFiles) {
      const fileArrayBuffer = await file.arrayBuffer();
      const inputDoc = await PDFDocument.load(fileArrayBuffer);
      const pages = await outputDoc.copyPages(
        inputDoc,
        inputDoc.getPageIndices()
      );
      for (const page of pages) {
        outputDoc.addPage(page);
      }
    }

    const pdfBytes = await outputDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    const fileName = "combined.pdf";

    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  return (
    <>
      <p>{files.length} files selected</p>
      <button onClick={() => combineFiles(files)}>Combine files</button>
    </>
  );
};

export default TransformCombine;
