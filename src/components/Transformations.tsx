/**
 * The Transformations component will accept a set of pdf files and a general action that the user wants to do with them: combine, split, add page numbers.
 * In the first mvc it will only add page numbers to the pdf files
 * It will use the pdf-lib library
 * It will provide a button to download the modified pdf file
 */

import TransformSplit from "./TransformSplit";
import TransformPages from "./TransformPages";
import TransformCombine from "./TransformCombine";
import TransformRotate from "./TransformRotate";
import { Action } from "../types";
import styles from "./Transformations.module.css";

interface TransformationsProps {
  action: Action;
  files: File[];
  orderFiles: number[];
  handleKeepOutputAsInput: (files: File[]) => void;
  isMobile: boolean;
  basename: string;
  setBasename: (basename: string) => void;
}

const Transformations = ({
  files,
  action,
  orderFiles,
  handleKeepOutputAsInput,
  isMobile,
  basename,
  setBasename,
}: TransformationsProps) => {
  return (
    <div
      className={
        isMobile ? styles.TransformationsMobile : styles.Transformations
      }
    >
      {action === "pages" && (
        <TransformPages
          file={files[0]}
          handleKeepOutputAsInput={handleKeepOutputAsInput}
          isMobile={isMobile}
        />
      )}
      {action === "combine" && (
        <TransformCombine
          files={files}
          orderFiles={orderFiles}
          handleKeepOutputAsInput={handleKeepOutputAsInput}
          basename={basename}
          setBasename={setBasename}
          isMobile={isMobile}
        />
      )}
      {action === "split" && (
        <TransformSplit
          file={files[0]}
          handleKeepOutputAsInput={handleKeepOutputAsInput}
          basename={basename}
          setBasename={setBasename}
          isMobile={isMobile}
        />
      )}
      {action === "rotate" && (
        <TransformRotate
          file={files[0]}
          handleKeepOutputAsInput={handleKeepOutputAsInput}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default Transformations;
