import { combineFiles } from "../utils/pdf-utils";

interface TransformCombineProps {
  files: File[];
}
const TransformCombine = ({ files }: TransformCombineProps) => {
  return (
    <>
      <p>{files.length} files selected</p>
      <button onClick={() => combineFiles(files)}>Combine files</button>
    </>
  );
};

export default TransformCombine;
