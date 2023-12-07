/**
 * This component receives a set of pdf files to be combined into a single pdf file with an array which specifies the order of the files
 */
import { useState } from "react";
import { combineFiles, downloadFile } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

export interface TransformCombineProps {
  files: File[];
  orderFiles: number[];
  handleKeepOutputAsInput: (files: File[]) => void;
  basename: string;
  setBasename: (basename: string) => void;
  isMobile: boolean;
}
const TransformCombine = ({
  files,
  orderFiles,
  handleKeepOutputAsInput,
  basename,
  setBasename,
  isMobile,
}: TransformCombineProps) => {
  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);
  const disabled = !files.length;

  function handleClickCombineFiles(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (files.length) {
      combineFiles(files, orderFiles, basename).then((file) => {
        if (keepOutputAsInput) {
          handleKeepOutputAsInput([file]);
        } else {
          downloadFile(file, basename);
        }
      });
    }
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setBasename("");
  }

  return (
    <form
      className={isMobile ? styles.formMobile : styles.form}
      autoComplete="off"
    >
      <p className={styles.p}>{files.length} files selected</p>
      <div>
        <label htmlFor="basename" className={styles.label}>
          Base name
        </label>
        <input
          id="basename"
          name="basename"
          onChange={(ev) => setBasename(ev.target.value)}
          type="text"
          placeholder={
            !disabled ? files[0].name.replace(/.pdf/i, "") : "Basename"
          }
          value={!disabled ? basename : ""}
          disabled={disabled}
          className={styles.inputText}
        />
      </div>
      <div>
        <button
          id="combine-btn"
          disabled={!files.length}
          onClick={handleClickCombineFiles}
        >
          Combine files
        </button>
        <button
          id="reset-basename-btn"
          onClick={handleClickReset}
          className={styles.button}
        >
          Reset
        </button>
      </div>
      <label className={styles.labelSmall}>
        <input
          id="combine-keep-output-as-input"
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

export default TransformCombine;
