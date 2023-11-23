/**
 * The TransformSplit component is responsible for managing the settings for the split operation.
 * The inputs and buttons are disabled when there is no file loaded.
 * When the button is clicked, the splitFiles function is called with the page ranges, the file and a base name.
 * One input allows to define a base name for the output files.
 * One input allows to define a series of pages or page ranges using ',' and '-'.
 */

import { useState } from "react";
import { splitFiles } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

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
    <form className={styles.form}>
      <div>
        <label htmlFor="basename" className={styles.label}>
          Base name
        </label>
        <input
          id="basename"
          name="basename"
          onChange={(ev) => setBasename(ev.target.value)}
          type="text"
          placeholder={!disabled ? file.name.replace(/.pdf/i, "") : "Basename"}
          value={!disabled ? basename : ""}
          disabled={disabled}
          className={styles.inputText}
        />
      </div>
      <div>
        <label htmlFor="pageRanges" className={styles.label}>
          Page ranges
        </label>
        <input
          onChange={(ev) => {
            setPageRanges(ev.target.value);
          }}
          type="text"
          placeholder="1,2,3-5"
          value={!disabled ? pageRanges : ""}
          disabled={disabled}
          className={styles.inputText}
        />
      </div>
      <div>
        <button
          disabled={disabled}
          className={styles.button}
          onClick={handleClickSplitFiles}
        >
          Split files
        </button>
        <button onClick={() => {}} className={styles.button}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default TransformSplit;
