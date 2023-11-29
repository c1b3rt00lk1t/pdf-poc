/**
 * This component receives a set of pdf files to be combined into a single pdf file with an array which specifies the order of the files
 */
import { useState } from "react";
import { combineFiles, downloadFile } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

interface TransformCombineProps {
  files: File[];
  orderFiles: number[];
  handleKeepOutputAsInput: (file: File) => void;
}
const TransformCombine = ({
  files,
  orderFiles,
  handleKeepOutputAsInput,
}: TransformCombineProps) => {
  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);
  return (
    <>
      <p>{files.length} files selected</p>
      <div>
        <button
          disabled={!files.length}
          onClick={() => {
            if (files.length) {
              combineFiles(files, orderFiles).then((file) => {
                if (keepOutputAsInput) {
                  handleKeepOutputAsInput(file);
                } else {
                  downloadFile(file, "output.pdf");
                }
              });
            }
          }}
        >
          Combine files
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
    </>
  );
};

export default TransformCombine;
