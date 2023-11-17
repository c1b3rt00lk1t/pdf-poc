/** In a first mvp the component will have an input that allows to select on pdf file from one folder and stores its content to be able to modify it in a later stage
 * Only pdf files will be allowed
 * The input must be able to optionally accept multiple files.
 */

import { ChangeEvent, useRef } from "react";
import styles from "./DropArea.module.css";

export interface DropAreaProps {
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickReset: () => void;
}

const DropArea = ({ handleChangeInput, handleClickReset }: DropAreaProps) => {
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
          multiple={false}
          onChange={handleChangeInput}
          ref={refInput}
        />
      </div>
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
  );
};

export default DropArea;
