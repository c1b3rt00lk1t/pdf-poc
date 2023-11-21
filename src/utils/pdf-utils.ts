import { PDFDocument, rgb } from "pdf-lib";

/**
 * Basic functions used in the different actions
 */

async function createBlob(pdfDoc: PDFDocument) {
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  return blob;
}

function downloadFile(file: Blob, fileName: string) {
  const url = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
}

export const availableFonts = {
  Courier: true,
  Helvetica: true,
  // "Symbol",
  // "ZapfDingbats",
  // "CourierBold",
  // "CourierOblique",
  // "CourierBoldOblique",
  // "HelveticaBold",
  // "HelveticaOblique",
  // "HelveticaBoldOblique",
  TimesRoman: true,
  // "TimesRomanBold",
  // "TimesRomanItalic",
  // "TimesRomanBoldItalic",
};

/*The following type extracts the keys of the availableFonts object*/
type FontType = keyof typeof availableFonts;

/**
 * combineFiles combines the pdf files that the user has selected
 */

export async function combineFiles(files: File[]) {
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

  const blob = await createBlob(outputDoc);
  downloadFile(blob, "combined.pdf");
}

/**
 * addPageNumbers adds page numbers to the pdf file
 * by default it adds the page number in the bottom center of the page
 * it adds a sequential number to each page
 * by default, starting from 2 and excluding the first page
 * by default it uses a font type Helvetica and a font size of 12
 */

export async function addPageNumbers(
  file: File,
  initialPage: number = 1,
  startNumber: number = 2,
  yCentimeters: number = 0.35,
  xPosition: "left" | "center" | "right" = "center",
  fontSize: number = 12,
  fontType: FontType = "Helvetica"
) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = async () => {
    const pdfData = reader.result as ArrayBuffer;
    const pdfDoc = await PDFDocument.load(pdfData);
    const pages = pdfDoc.getPages();
    const helveticaFont = await pdfDoc.embedFont(fontType);

    pages.forEach((page, index) => {
      if (index !== initialPage - 1) {
        const yPoints = (yCentimeters / 2.54) * 72;
        const xPoints =
          xPosition === "center"
            ? page.getWidth() / 2
            : xPosition === "left"
            ? 50
            : page.getWidth() - 50;

        page.drawText((index + startNumber - initialPage).toString(), {
          x: xPoints,
          y: yPoints,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    });

    const blob = await createBlob(pdfDoc);
    const fileName = `${file.name.slice(0, -4)} - pages.pdf`;
    downloadFile(blob, fileName);
  };
}

/**
 * splitFiles splits the pdf file using the input that the user provides
 * a comma separated list of pages will be provided
 * a '-' indicates a range of pages
 * example: 1,2,3-5 would split the pdf file in three files:
 * one with page 1, one with page 2 and one with pages 3, 4 and 5
 *  only the valid ranges will be processed
 */

export async function splitFiles(pageRanges: string, file: File) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = async () => {
    const pdfData = reader.result as ArrayBuffer;
    const inputDoc = await PDFDocument.load(pdfData);
    const numPages = inputDoc.getPages().length;

    // Split the page ranges into an array of start and end page numbers
    // Filter out any ranges that are not within the number of pages in the document
    const ranges = pageRanges
      .split(",")
      .map((range) => range.split("-").map(Number))
      .filter(
        (range) =>
          range[0] > 0 &&
          range[0] <= numPages &&
          (range[1] === undefined || (range[1] > 0 && range[1] <= numPages))
      );

    // For each range, create a new PDF document and copy the pages from the input document
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

    // For each output document, save it as a PDF file and trigger a download
    for (let i = 0; i < outputDocs.length; i++) {
      const blob = await createBlob(outputDocs[i]);
      downloadFile(blob, `output${i + 1}.pdf`);
    }
  };
}
