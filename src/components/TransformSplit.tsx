import { PDFDocument } from "pdf-lib";

interface TransformSplitProps {
  file: File | null;
}

const TransformSplit = ({ file }: TransformSplitProps) => {
  // splitFiles will split the pdf file using the input that the user provides
  // a comma separated list of pages will be provided where a - will indicate a range of pages
  // it will use the pdf-lib library
  // example: 1,2,3-5 would split the pdf file in three files: one with page 1, one with page 2 and one with pages 3, 4 and 5
  // in the event that the pages provided are not valid, the app will show an error message
  async function splitFiles(pageRanges: string, file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfData = reader.result as ArrayBuffer;
      const inputDoc = await PDFDocument.load(pdfData);
      const ranges = pageRanges
        .split(",")
        .map((range) => range.split("-").map(Number));
      console.log(ranges);
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
      {file && <input type="text" placeholder="1,2,3-5" />}
      {file && (
        <button onClick={() => splitFiles("1-4,3-5", file)}>Split files</button>
      )}
    </>
  );
};

export default TransformSplit;
