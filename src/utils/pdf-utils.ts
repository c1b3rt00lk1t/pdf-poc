import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Basic functions used in the different actions
 */

async function createBlob(pdfDoc: PDFDocument) {
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  return blob;
}

export function downloadFile(file: Blob | File, fileName: string) {
  const url = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
}

export const availableFonts = {
  Courier: "Courier",
  Helvetica: "Helvetica",
  "Times-Roman": "Times New Roman",
} as const;

/*The following type extracts the literal values of the availableFonts object*/
type FontType = keyof typeof availableFonts;

/**
 * combineFiles combines the pdf files that the user has selected
 * it accepts an optional parameter to specify the order of the files. An array is passed with the index of the original file in files in the selected position.
 */

export async function combineFiles(
  files: File[],
  order: number[],
  name: string = files[0].name
) {
  const outputDoc = await PDFDocument.create();

  const orderedFiles = files.map((_, index, array) =>
    order ? array[order[index]] : array[index]
  );

  for (const file of orderedFiles) {
    console.log(file.name);
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
  const fileName = `${name.replace(/.pdf/i, "")} - combined.pdf`;
  const outputAsInputFile = new File([blob], fileName, { type: blob.type });
  return outputAsInputFile;
}

/**
 * addPageNumbers adds page numbers to the pdf file
 * by default it adds the page number in the bottom center of the page
 * it adds a sequential number to each page
 * by default, starting from 2 and excluding the first page
 * by default it uses a font type Helvetica and a font size of 12
 */

export type AddPageOptions = {
  initialPage: number;
  startNumber: number;
  yCentimeters: number;
  xPosition: "center" | "left" | "right";
  fontSize: number;
  fontType: FontType;
};

export const addPageDefaultOptions: AddPageOptions = {
  initialPage: 2,
  startNumber: 2,
  yCentimeters: 0.35,
  xPosition: "center",
  fontSize: 12,
  fontType: "Helvetica",
};

export async function addPageNumbers(file: File, options: AddPageOptions) {
  const {
    initialPage,
    startNumber,
    yCentimeters,
    xPosition,
    fontSize,
    fontType,
  } = { ...addPageDefaultOptions, ...options };

  const fileArrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileArrayBuffer);

  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(fontType);

  pages.forEach((page, index) => {
    if (index >= initialPage - 1) {
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
  const fileName = `${file.name.replace(/.pdf/i, "")} - pages.pdf`;
  const outputAsInputFile = new File([blob], fileName, { type: blob.type });
  return outputAsInputFile;
}

/**
 * splitFiles splits the pdf file using the input that the user provides
 * a comma separated list of pages will be provided
 * a '-' indicates a range of pages
 * example: 1,2,3-5 would split the pdf file in three files:
 * one with page 1, one with page 2 and one with pages 3, 4 and 5
 * only the valid ranges will be processed.
 * It allows a name parameter to be passed although it will take the
 * name of the original file as the default base name
 */

export async function splitFiles(
  pageRanges: string,
  file: File,
  name: string = file.name
) {
  const fileArrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileArrayBuffer);

  const numPages = pdfDoc.getPages().length;

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
        pdfDoc,
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

  return Promise.all(
    outputDocs.map(async (doc, i) => {
      const blob = await createBlob(doc);
      return new File(
        [blob],
        `${name.replace(/.pdf/i, "")} [${ranges[i][0]}${
          ranges[i].length > 1 ? `-${ranges[i][1]}` : ``
        }].pdf`,
        {
          type: blob.type,
        }
      );
    })
  );
}

/**
 * rotatePages rotates the pages of the pdf file
 * it accepts the number of degrees to rotate
 * it accepts a list of pages to rotate
 * it accepts a parameter to rotate all pages
 */

export const allowedDegreeAngles = [-180, -90, 90, 180] as const;

export type RotateOptions = {
  degreeAngle: (typeof allowedDegreeAngles)[number];
  pages: number[];
  allPages: boolean;
};

export const rotateDefaultOptions: RotateOptions = {
  degreeAngle: -90,
  pages: [],
  allPages: true,
};

export async function rotatePages(file: File, options: RotateOptions) {
  const { degreeAngle, pages, allPages } = {
    ...rotateDefaultOptions,
    ...options,
  };

  const fileArrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileArrayBuffer);

  const pagesToRotate = allPages
    ? pdfDoc.getPages()
    : pdfDoc.getPages().filter((_, index) => pages.includes(index + 1));

  pagesToRotate.forEach((page) => {
    page.setRotation(degrees(degreeAngle));
  });

  const blob = await createBlob(pdfDoc);
  const fileName = `${file.name.replace(/.pdf/i, "")} - rotated.pdf`;
  const outputAsInputFile = new File([blob], fileName, { type: blob.type });
  return outputAsInputFile;
}
