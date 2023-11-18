/**
 * The Transformations component will accept a set of pdf files and a general action that the user wants to do with them: combine, split, add page numbers.
 * In the first mvc it will only add page numbers to the pdf files
 * It will use the pdf-lib library
 * It will provide a button to download the modified pdf file
 */

import { PDFDocument } from "pdf-lib";
import TransformSplit from "./TransformSplit";
import TransformPages from "./TransformPages";

interface TransformationsProps {
  action: "combine" | "split" | "pages";
  files: File[];
}

const Transformations = ({ files, action }: TransformationsProps) => {
  // combineFiles will combine the pdf files that the user has selected
  // it will use the pdf-lib library
  // the output file will be a file that contains all the pages of the input files

  async function combineFiles() {
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

  const actionTitles = {
    combine: "Combine files",
    split: "Split files",
    pages: "Add page numbers",
  };

  return (
    <div>
      <h1>{actionTitles[action]}</h1>
      {action === "pages" && files.length > 0 && (
        <TransformPages file={files[0]} />
      )}
      {action === "combine" && files.length > 0 && (
        <>
          <p>{files.length} files selected</p>
          <button onClick={combineFiles}>Combine files</button>
        </>
      )}
      {action === "split" && files.length > 0 && (
        <TransformSplit file={files[0]} />
      )}
    </div>
  );
};

export default Transformations;
