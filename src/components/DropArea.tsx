/** In a first mvp the component will have an input that allows to select on pdf file from one folder and stores its content to be able to modify it in a later stage
 * Only pdf files will be allowed
 * The input must be able to optionally accept multiple files. A checkbox will allow to select if the user wants to select one or multiple files
 */

import { ChangeEvent, useRef, useState } from "react";
import styles from "./DropArea.module.css";

export interface DropAreaProps {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickReset: () => void;
}

const DropArea = ({ handleChangeInput, handleClickReset }: DropAreaProps) => {
  const [multipleFiles, setMultipleFiles] = useState<boolean>(false);

  const refInput = useRef<HTMLInputElement>(null);
  const resetInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };

  return (
    <div className={styles.DropArea}>
      <div>
        <h1>Drop Area</h1>
        <input
          type="file"
          accept=".pdf"
          multiple={multipleFiles}
          onChange={handleChangeInput}
          ref={refInput}
        />
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            handleClickReset();
            resetInput(refInput);
          }}
        >
          Reset
        </button>
        <input
          type="checkbox"
          onChange={() => setMultipleFiles((multipleFiles) => !multipleFiles)}
        />{" "}
        Allow multiple files
      </div>
    </div>
  );
};

export default DropArea;
