/**
 * The TransformSplit component is responsible for rotating the pages of a PDF file.
 * The inputs and buttons are disabled when there is no file loaded.
 * When the button is clicked, the rotatePages function is called with the degree angle to rotate, the pages to rotate or an indication of all pages to be rotated.
 * One input allows to define the degree angle to rotate.
 * One input allows to indicate that all pages must be rotated.
 * One input allows to define a series of pages or page ranges using ',' and '-'.
 */

import { useState, useReducer } from "react";
import {
  downloadFile,
  rotatePages,
  rotateDefaultOptions,
  RotateOptions,
} from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

interface TransformRotate {
  file: File;
  handleKeepOutputAsInput: (files: File[]) => void;
  isMobile: boolean;
}

function rotatePagesReducer(state: RotateOptions, action: any) {
  switch (action.type) {
    case "degreeAngle":
      return action.value > -180 && action.value < 180
        ? { ...state, degreeAngle: action.value }
        : state;
    case "pages":
      return { ...state, pages: action.value };
    case "allPages":
      return { ...state, allPages: action.value };
    case "reset":
      return rotateDefaultOptions;
    default:
      throw new Error();
  }
}

const TransformRotate = ({
  file,
  handleKeepOutputAsInput,
  isMobile,
}: TransformRotate) => {
  const [options, dispatch] = useReducer(
    rotatePagesReducer,
    rotateDefaultOptions
  );

  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);
  const [pageRanges, setPageRanges] = useState<string>("");

  const disabled = !file;

  function handleClickRotatePages(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (file) {
      rotatePages(file, options).then((file) => {
        console.log(file);
        if (keepOutputAsInput) {
          handleKeepOutputAsInput([file]);
        } else {
          downloadFile(file, file.name);
        }
      });
    }
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setPageRanges("");
  }

  return (
    <form
      className={isMobile ? styles.formMobile : styles.form}
      autoComplete="off"
    >
      <div>
        <label htmlFor="pageRanges" className={styles.label}>
          Page ranges
        </label>
        <input
          onChange={(ev) => {
            setPageRanges(ev.target.value);
          }}
          type="text"
          placeholder="1,2,3-5"
          value={!disabled ? pageRanges : ""}
          disabled={disabled}
          className={styles.inputText}
        />
      </div>
      <div>
        <label htmlFor="degreeAngle" className={styles.label}>
          Degree angle
        </label>
        <input
          type="number"
          id="degreeAngle"
          name="degreeAngle"
          value={options.degreeAngle}
          onChange={(ev) =>
            dispatch({
              type: "degreeAngle",
              value: Number(ev.target.value),
            })
          }
          disabled={disabled}
        />
      </div>
      <div>
        <button
          disabled={disabled}
          className={styles.button}
          onClick={handleClickRotatePages}
        >
          Rotate pages
        </button>
        <button onClick={handleClickReset} className={styles.button}>
          Reset
        </button>
      </div>
      <label className={styles.labelSmall}>
        <input
          type="checkbox"
          onChange={() =>
            setKeepOutputAsInput((keepOutputAsInput) => !keepOutputAsInput)
          }
        />{" "}
        Keep output as next input
      </label>
    </form>
  );
};

export default TransformRotate;
