import { useState } from "react";
import { splitFiles } from "../utils/pdf-utils";

interface TransformSplitProps {
  file: File;
}

const TransformSplit = ({ file }: TransformSplitProps) => {
  const [pageRanges, setPageRanges] = useState<string>("");

  return (
    <>
      <input
        onChange={(ev) => {
          setPageRanges(ev.target.value);
        }}
        type="text"
        placeholder="1,2,3-5"
        value={!!file ? pageRanges : ""}
        disabled={!file}
      />
      <button
        disabled={!file}
        onClick={() => file && splitFiles(pageRanges, file)}
      >
        Split files
      </button>
    </>
  );
};

export default TransformSplit;
