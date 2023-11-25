/** In a first mvp the component will have an input that allows to select on pdf file from one folder and stores its content to be able to modify it in a later stage
 * Only pdf files will be allowed
 * Initially, the input must be able to optionally accept multiple files. A checkbox will allow to select if the user wants to select one or multiple files. In the final implementation the option to select multiple files will depend on the action the user wants to do
 */

import { useRef } from "react";
import { Action } from "../types";
import styles from "./FileSelection.module.css";
import FileList from "./FileList";
import { MdAddCircleOutline, MdOutlineReplay } from "react-icons/md";

export interface FileSelectionProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setOrderFiles: (orderFiles: number[]) => void;
  handleClickReset: () => void;
  action: Action;
  orderFiles: number[];
}

const FileSelection = ({
  files,
  setFiles,
  setOrderFiles,
  handleClickReset,
  action,
  orderFiles,
}: FileSelectionProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const resetInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const handleClickAdd = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.multiple = action === "combine" ? true : false;
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        setFiles(Array.from(files));
        setOrderFiles(Array.from(Array(files.length).keys()));
      }
    };
    input.click();
  };

  return (
    <div className={styles.FileSelection}>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleClickAdd}>
          <MdAddCircleOutline />
          <span>Add</span>
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleClickReset();
            resetInput(refInput);
          }}
        >
          <MdOutlineReplay />
          <span>Reset </span>
        </button>
      </div>
      <FileList
        files={files}
        orderFiles={orderFiles}
        setOrderFiles={setOrderFiles}
      />
    </div>
  );
};

export default FileSelection;
