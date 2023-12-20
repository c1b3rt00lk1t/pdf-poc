function encodeTextToBuffer(text: string) {
  const buffer = new ArrayBuffer(text.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < text.length; i++) {
    view[i] = text.charCodeAt(i);
  }
  return buffer;
}

Object.defineProperty(File.prototype, "arrayBuffer", {
  value: async function () {
    // Create a simple PDF content
    const pdfContent =
      "%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [] >>\nendobj\nxref\n0 3\n0000000000 65535 f\n0000000010 00000 n\n0000000058 00000 n\ntrailer\n<< /Root 1 0 R >>\n";

    // Convert the PDF content to ArrayBuffer
    return encodeTextToBuffer(pdfContent);
  },
});
