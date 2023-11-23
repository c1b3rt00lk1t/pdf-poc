/**
 * The TransformSplit component is responsible for managing the settings for the split operation.
 * The inputs and buttons are disabled when there is no file loaded.
 * When the button is clicked, the splitFiles function is called with the page ranges, the file and a base name.
 * One input allows to define a base name for the output files.
 * One input allows to define a series of pages or page ranges using ',' and '-'.
 */

import { useState } from "react";
import { splitFiles } from "../utils/pdf-utils";

interface TransformSplitProps {
  file: File;
}

const TransformSplit = ({ file }: TransformSplitProps) => {
  const [pageRanges, setPageRanges] = useState<string>("");
  const [basename, setBasename] = useState<string>("");
  const disabled = !file;

  function handleClickSplitFiles(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    splitFiles(pageRanges, file, basename);
  }

  return (
    <form>
      <input
        onChange={(ev) => setBasename(ev.target.value)}
        type="text"
        placeholder={!disabled ? file.name.replace(/.pdf/i, "") : "Basename"}
        value={!disabled ? basename : ""}
        disabled={disabled}
      />
      <input
        onChange={(ev) => {
          setPageRanges(ev.target.value);
        }}
        type="text"
        placeholder="1,2,3-5"
        value={!disabled ? pageRanges : ""}
        disabled={disabled}
      />
      <button disabled={disabled} onClick={handleClickSplitFiles}>
        Split files
      </button>
    </form>
  );
};

export default TransformSplit;
