import TransformSplit from "./TransformSplit";
import TransformPages from "./TransformPages";
import TransformCombine from "./TransformCombine";
import TransformRotate from "./TransformRotate";
import { Action } from "../types";
import styles from "./Transformations.module.css";

export interface TransformationsProps {
  action: Action;
  files: File[];
  orderFiles: number[];
  handleKeepOutputAsInput: (files: File[]) => void;
  isMobile: boolean;
  basename: string;
  setBasename: (basename: string) => void;
  handleClickAction: (action: Action) => void;
}

const Transformations = ({
  files,
  action,
  orderFiles,
  handleKeepOutputAsInput,
  isMobile,
  basename,
  setBasename,
  handleClickAction,
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
          handleClickAction={handleClickAction}
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
