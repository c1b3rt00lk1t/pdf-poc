/**
 * The Transformations component will accept a set of pdf files and a general action that the user wants to do with them: combine, split, add page numbers.
 * In the first mvc it will only add page numbers to the pdf files
 * It will use the pdf-lib library
 * It will provide a button to download the modified pdf file
 */

import * as PDFLib from "pdf-lib";

interface TransformationsProps {
  action: "combine" | "split" | "pages";
  files: File[];
}

const Transformations = ({ files, action }: TransformationsProps) => {
  // addPageNumbers will add page numbers to the pdf file
  // in the first mvp it will add a sequential number to each page, starting from 2 and excluding the first page
  // it will use the pdf-lib library
  // it will use a font type Arial and a font size of 12
  // it will add the page centered in the middle of the page and in the bottom of the page
  async function addPageNumbers() {
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onloadend = async () => {
      const pdfData = reader.result as ArrayBuffer;
      const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();
      const helveticaFont = await pdfDoc.embedFont(
        PDFLib.StandardFonts.Helvetica
      );

      pages.forEach((page, index) => {
        if (index !== 0) {
          page.drawText((index + 1).toString(), {
            x: page.getWidth() / 2,
            y: 10,
            size: 9,
            font: helveticaFont,
            color: PDFLib.rgb(0, 0, 0),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      const fileName = `${files[0].name.slice(0, -4)} - pages.pdf`;

      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.click();
    };
  }

  return (
    <div>
      <h1>{action === "pages" && "Add page numbers"}</h1>
      <p>{files[0] && files[0].name}</p>
      <button onClick={addPageNumbers}>Add page numbers</button>
    </div>
  );
};

export default Transformations;
