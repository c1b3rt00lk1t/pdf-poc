/** In a first mvp the component will have an input that allows to select on pdf file from one folder and stores its content to be able to modify it in a later stage
 * Only pdf files will be allowed
 * Initially, the input must be able to optionally accept multiple files. A checkbox will allow to select if the user wants to select one or multiple files. In the final implementation the option to select multiple files will depend on the action the user wants to do
 */

import { ChangeEvent, useRef } from "react";

import styles from "./FileSelection.module.css";
import DropArea from "./DropArea";

export interface FileSelectionProps {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickReset: () => void;
  action: "combine" | "split" | "pages";
}

const FileSelection = ({
  handleChangeInput,
  handleClickReset,
  action,
}: FileSelectionProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const resetInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };

  return (
    <div className={styles.FileSelection}>
      <div>
        <h1>File Selection</h1>
        <DropArea />
        <input
          type="file"
          accept=".pdf"
          multiple={action === "combine"}
          onChange={handleChangeInput}
          ref={refInput}
        />
        <button
          className={styles.button}
          onClick={() => {
            handleClickReset();
            resetInput(refInput);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FileSelection;
