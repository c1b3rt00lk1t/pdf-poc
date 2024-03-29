import { useState } from "react";
import { splitFiles, downloadFile } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";
import { Action } from "../types";

export interface TransformSplitProps {
  file: File;
  handleKeepOutputAsInput: (files: File[]) => void;
  basename: string;
  setBasename: (basename: string) => void;
  isMobile: boolean;
  handleClickAction: (action: Action) => void;
}

const TransformSplit = ({
  file,
  handleKeepOutputAsInput,
  basename,
  setBasename,
  isMobile,
  handleClickAction,
}: TransformSplitProps) => {
  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);
  const [pageRanges, setPageRanges] = useState<string>("");

  const disabled = !file;
  const placeholder = !disabled ? file.name.replace(/.pdf/i, "") : "Basename";

  function handleClickSplitFiles(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (file) {
      splitFiles(pageRanges, file, basename || placeholder).then((files) => {
        console.log(files);
        if (keepOutputAsInput) {
          handleKeepOutputAsInput(files);
          handleClickAction("combine");
        } else {
          files.forEach((file) => {
            downloadFile(file, file.name || placeholder);
          });
        }
      });
    }
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageRanges("");
    setBasename("");
  }

  return (
    <form
      className={isMobile ? styles.formMobile : styles.form}
      autoComplete="off"
    >
      <div>
        <label htmlFor="basename" className={styles.label}>
          Base name
        </label>
        <input
          id="basename"
          name="basename"
          onChange={(ev) => setBasename(ev.target.value)}
          type="text"
          placeholder={placeholder}
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
          id="pageRanges"
          name="pageRanges"
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
          // checks that pageRanges is not empty string and is composed by numbers, comma or -
          disabled={
            disabled ||
            pageRanges === "" ||
            ![...pageRanges].every(
              (char) => char === "," || char === "-" || !isNaN(+char)
            )
          }
          className={styles.button}
          onClick={handleClickSplitFiles}
        >
          Split files
        </button>
        <button onClick={handleClickReset} className={styles.button}>
          Reset
        </button>
      </div>
      <label className={styles.labelSmall}>
        <input
          type="checkbox"
          onChange={() =>
            setKeepOutputAsInput((keepOutputAsInput) => !keepOutputAsInput)
          }
        />{" "}
        Keep output as next input
      </label>
    </form>
  );
};

export default TransformSplit;
