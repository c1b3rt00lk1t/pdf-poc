import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TransformPagesProps {
  file: File;
}

const TransformPages = ({ file }: TransformPagesProps) => {
  // addPageNumbers will add page numbers to the pdf file
  // in the first mvp it will add a sequential number to each page, starting from 2 and excluding the first page
  // it will use the pdf-lib library
  // it will use a font type Arial and a font size of 12
  // it will add the page centered in the middle of the page and in the bottom of the page
  async function addPageNumbers(file: File) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const pdfData = reader.result as ArrayBuffer;
      const pdfDoc = await PDFDocument.load(pdfData);
      const pages = pdfDoc.getPages();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pages.forEach((page, index) => {
        if (index !== 0) {
          page.drawText((index + 1).toString(), {
            x: page.getWidth() / 2,
            y: 10,
            size: 9,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      const fileName = `${file.name.slice(0, -4)} - pages.pdf`;

      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.click();
    };
  }
  return (
    <>
      <p>{file && file.name}</p>
      {file && (
        <button onClick={() => addPageNumbers(file)}>Add page numbers</button>
      )}
    </>
  );
};

export default TransformPages;
