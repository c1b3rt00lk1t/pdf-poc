/**
 * This component receives a set of pdf files to be combined into a single pdf file with an array which specifies the order of the files
 */

import { combineFiles } from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

interface TransformCombineProps {
  files: File[];
  orderFiles: number[];
}
const TransformCombine = ({ files, orderFiles }: TransformCombineProps) => {
  return (
    <>
      <p>{files.length} files selected</p>
      <div>
        <button
          disabled={!files.length}
          onClick={() => files.length && combineFiles(files, orderFiles)}
        >
          Combine files
        </button>
      </div>
      <label className={styles.labelSmall}>
        <input type="checkbox" /> Keep the output as next input
      </label>
    </>
  );
};

export default TransformCombine;
