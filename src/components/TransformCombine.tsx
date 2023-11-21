import { combineFiles } from "../utils/pdf-utils";

interface TransformCombineProps {
  files: File[];
}
const TransformCombine = ({ files }: TransformCombineProps) => {
  return (
    <>
      <p>{files.length} files selected</p>
      <button
        disabled={!files.length}
        onClick={() => files.length && combineFiles(files)}
      >
        Combine files
      </button>
    </>
  );
};

export default TransformCombine;
