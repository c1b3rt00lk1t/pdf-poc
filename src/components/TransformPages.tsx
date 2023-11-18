import { addPageNumbers } from "../utils/pdf-utils";

interface TransformPagesProps {
  file: File;
}

const TransformPages = ({ file }: TransformPagesProps) => {
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
