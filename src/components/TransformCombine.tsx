/**
 * This component receives a set of pdf files to be combined into a single pdf file with an array which specifies the order of the files
 */
import { useState } from "react";
import { combineFiles, downloadFile } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

interface TransformCombineProps {
  files: File[];
  orderFiles: number[];
  handleKeepOutputAsInput: (files: File[]) => void;
}
const TransformCombine = ({
  files,
  orderFiles,
  handleKeepOutputAsInput,
}: TransformCombineProps) => {
  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);
  const [basename, setBasename] = useState<string>(
    files.length ? files[0].name.replace(/.pdf/i, "") : ""
  );
  const disabled = !files.length;

  function handleClickCombineFiles(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (files.length) {
      combineFiles(files, orderFiles).then((file) => {
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
    <form className={styles.form} autoComplete="off">
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
        <button disabled={!files.length} onClick={handleClickCombineFiles}>
          Combine files
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

export default TransformCombine;
