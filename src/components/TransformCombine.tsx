/**
 * This component receives a set of pdf files to be combined into a single pdf file with an array which specifies the order of the files
 */

import { combineFiles } from "../utils/pdf-utils";

interface TransformCombineProps {
  files: File[];
  orderFiles: number[];
}
const TransformCombine = ({ files, orderFiles }: TransformCombineProps) => {
  return (
    <>
      <p>{files.length} files selected</p>
      <button
        disabled={!files.length}
        onClick={() => files.length && combineFiles(files, orderFiles)}
      >
        Combine files
      </button>
    </>
  );
};

export default TransformCombine;
