import { PDFDocument } from "pdf-lib";
import { useState } from "react";

interface TransformSplitProps {
  file: File | null;
}

const TransformSplit = ({ file }: TransformSplitProps) => {
  const [pageRanges, setPageRanges] = useState<string>("");

  // splitFiles will split the pdf file using the input that the user provides
  // a comma separated list of pages will be provided where a - will indicate a range of pages
  // it will use the pdf-lib library
  // example: 1,2,3-5 would split the pdf file in three files: one with page 1, one with page 2 and one with pages 3, 4 and 5
  // in the event that the pages provided are not valid, only the valid ranges will be processed
  async function splitFiles(pageRanges: string, file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfData = reader.result as ArrayBuffer;
      const inputDoc = await PDFDocument.load(pdfData);
      const numPages = inputDoc.getPages().length;
      const ranges = pageRanges
        .split(",")
        .map((range) => range.split("-").map(Number))
        .filter(
          (range) =>
            range[0] > 0 &&
            range[0] <= numPages &&
            (range[1] === undefined || (range[1] > 0 && range[1] <= numPages))
        );

      const outputDocs = await Promise.all(
        ranges.map(async (range) => {
          const outputDoc = await PDFDocument.create();
          const pages = await outputDoc.copyPages(
            inputDoc,
            range[1] === undefined
              ? [range[0] - 1]
              : Array.from(
                  { length: range[1] - range[0] + 1 },
                  (_, i) => i + range[0] - 1
                )
          );
          for (const page of pages) {
            outputDoc.addPage(page);
          }
          return outputDoc;
        })
      );

      for (let i = 0; i < outputDocs.length; i++) {
        const pdfBytes = await outputDocs[i].save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `output${i + 1}.pdf`;
        downloadLink.click();
      }
    };
  }

  return (
    <>
      <p>{file && file.name}</p>
      {file && (
        <input
          onChange={(ev) => {
            setPageRanges(ev.target.value);
          }}
          type="text"
          placeholder="1,2,3-5"
          value={pageRanges}
        />
      )}
      {file && (
        <button onClick={() => splitFiles(pageRanges, file)}>
          Split files
        </button>
      )}
    </>
  );
};

export default TransformSplit;
