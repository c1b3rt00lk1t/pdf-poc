/**
 * The Transformations component will accept a set of pdf files and a general action that the user wants to do with them: combine, split, add page numbers.
 * In the first mvc it will only add page numbers to the pdf files
 * It will use the pdf-lib library
 * It will provide a button to download the modified pdf file
 */

import TransformSplit from "./TransformSplit";
import TransformPages from "./TransformPages";
import TransformCombine from "./TransformCombine";
import { Action } from "../types";
import styles from "./Transformations.module.css";

interface TransformationsProps {
  action: Action;
  files: File[];
  orderFiles: number[];
}

const Transformations = ({
  files,
  action,
  orderFiles,
}: TransformationsProps) => {
  return (
    <div className={styles.Transformations}>
      {action === "pages" && <TransformPages file={files[0]} />}
      {action === "combine" && (
        <TransformCombine files={files} orderFiles={orderFiles} />
      )}
      {action === "split" && <TransformSplit file={files[0]} />}
    </div>
  );
};

export default Transformations;
