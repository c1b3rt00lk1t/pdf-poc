import { useReducer } from "react";
import {
  addPageNumbers,
  addPageDefaultOptions,
  AddPageOptions,
  availableFonts,
} from "../utils/pdf-utils";
import styles from "./Transformations.module.css";

interface TransformPagesProps {
  file: File;
  handleKeepOutputAsInput: (file: File) => void;
}

function addPagesReducer(state: AddPageOptions, action: any) {
  switch (action.type) {
    case "initialPage":
      return action.value > 0 ? { ...state, initialPage: action.value } : state;
    case "startNumber":
      return action.value > 0 ? { ...state, startNumber: action.value } : state;
    case "fontType":
      return { ...state, fontType: action.value };
    case "yCentimeters":
      return action.value > 0
        ? { ...state, yCentimeters: action.value }
        : state;
    case "xPosition":
      return { ...state, xPosition: action.value };
    case "fontSize":
      return action.value > 0 ? { ...state, fontSize: action.value } : state;
    case "reset":
      return addPageDefaultOptions;
    default:
      throw new Error();
  }
}

const TransformPages = ({
  file,
  handleKeepOutputAsInput,
}: TransformPagesProps) => {
  const [options, dispatch] = useReducer(
    addPagesReducer,
    addPageDefaultOptions
  );

  const handleChange =
    (type: string, transform?: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      dispatch({
        type,
        value:
          transform === "number"
            ? Number(event.target.value)
            : event.target.value,
      });
    };

  const handleChangeInitialPage = handleChange("initialPage", "number");
  const handleChangeStartNumber = handleChange("startNumber", "number");
  const handleChangeYCentimeters = handleChange("yCentimeters", "number");
  const handleChangeFontSize = handleChange("fontSize", "number");
  const handleChangeXPosition = handleChange("xPosition");
  const handleChangeFontType = handleChange("fontType");

  function handleClickAddPageNumbers(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    if (file) addPageNumbers(file, options);
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch({ type: "reset" });
  }

  return (
    <form className={styles.form} autoComplete="off">
      <div>
        <label htmlFor="initialPage" className={styles.label}>
          Initial page
        </label>
        <input
          type="number"
          id="initialPage"
          name="initialPage"
          value={options.initialPage}
          onChange={handleChangeInitialPage}
          placeholder={options.initialPage.toString()}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="startNumber" className={styles.label}>
          Start number
        </label>
        <input
          type="number"
          id="startNumber"
          name="startNumber"
          value={options.startNumber.toString()}
          onChange={handleChangeStartNumber}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="yCentimeters" className={styles.label}>
          Bottom margin (cm)
        </label>
        <input
          type="number"
          id="yCentimeters"
          name="yCentimeters"
          value={options.yCentimeters.toFixed(2)}
          step="0.01"
          onChange={handleChangeYCentimeters}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="xPosition" className={styles.label}>
          Horizontal alignment
        </label>
        <select
          id="xPosition"
          name="xPosition"
          value={options.xPosition}
          onChange={handleChangeXPosition}
        >
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label htmlFor="fontSize" className={styles.label}>
          Font size
        </label>
        <input
          type="number"
          id="fontSize"
          name="fontSize"
          value={options.fontSize.toString()}
          onChange={handleChangeFontSize}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="font" className={styles.label}>
          Font
        </label>
        <select
          id="font"
          name="font"
          onChange={handleChangeFontType}
          value={options.fontType}
        >
          {Object.entries(availableFonts).map(([fontKey, fontDesc]) => (
            <option key={fontKey} value={fontKey}>
              {fontDesc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          disabled={!file}
          onClick={handleClickAddPageNumbers}
          className={styles.button}
        >
          Add numbers
        </button>
        <button onClick={handleClickReset} className={styles.button}>
          Reset
        </button>
      </div>
      <label className={styles.labelSmall}>
        <input type="checkbox" /> Keep output as next input
      </label>
    </form>
  );
};

export default TransformPages;
