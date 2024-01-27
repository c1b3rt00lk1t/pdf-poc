import { useState, useReducer } from "react";
import {
  downloadFile,
  rotatePages,
  rotateDefaultOptions,
  RotateOptions,
  allowedDegreeAngles,
} from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

export interface TransformRotateProps {
  file: File;
  handleKeepOutputAsInput: (files: File[]) => void;
  isMobile: boolean;
}

export function rotatePagesReducer(state: RotateOptions, action: any) {
  switch (action.type) {
    case "degreeAngle":
      return allowedDegreeAngles.includes(action.value)
        ? { ...state, degreeAngle: action.value }
        : state;
    case "pages":
      return {
        ...state,
        pages: action.value,
        allPages: action.value === "" ? true : false,
      };
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
}: TransformRotateProps) => {
  const [options, dispatch] = useReducer(
    rotatePagesReducer,
    rotateDefaultOptions
  );

  const [keepOutputAsInput, setKeepOutputAsInput] = useState<boolean>(false);

  const disabled = !file;

  function handleClickRotatePages(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (file) {
      console.log(options);
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
    dispatch({
      type: "reset",
    });
  }

  return (
    <form
      className={isMobile ? styles.formMobile : styles.form}
      autoComplete="off"
    >
      <div>
        <label htmlFor="pageRanges" className={styles.label}>
          Page ranges (optional)
        </label>
        <input
          id="pageRanges"
          name="pageRanges"
          onChange={(ev) => {
            dispatch({
              type: "pages",
              value: ev.target.value,
            });
          }}
          type="text"
          placeholder="1,2,3-5"
          value={!disabled ? options.pages : ""}
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
          step="90"
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
        <button disabled={disabled} onClick={handleClickRotatePages}>
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
