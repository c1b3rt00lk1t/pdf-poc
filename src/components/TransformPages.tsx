import { useReducer } from "react";
import {
  addPageNumbers,
  addPageDefaultOptions,
  AddPageOptions,
  availableFonts,
} from "../utils/pdf-utils";

interface TransformPagesProps {
  file: File;
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

const TransformPages = ({ file }: TransformPagesProps) => {
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
    console.log(options);
    addPageNumbers(file, options);
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch({ type: "reset" });
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="initialPage">Initial page</label>
          <input
            type="number"
            id="initialPage"
            name="initialPage"
            value={options.initialPage}
            onChange={handleChangeInitialPage}
            placeholder={options.initialPage.toString()}
          />
        </div>
        <div>
          <label htmlFor="startNumber">Start number</label>
          <input
            type="number"
            id="startNumber"
            name="startNumber"
            value={options.startNumber.toString()}
            onChange={handleChangeStartNumber}
          />
        </div>
        <div>
          <label htmlFor="yCentimeters">Bottom margin (cm)</label>
          <input
            type="number"
            id="yCentimeters"
            name="yCentimeters"
            value={options.yCentimeters.toFixed(2)}
            step="0.01"
            onChange={handleChangeYCentimeters}
          />
        </div>
        <div>
          <label htmlFor="xPosition">Horizontal alignment</label>
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
          <label htmlFor="fontSize">Font size</label>
          <input
            type="number"
            id="fontSize"
            name="fontSize"
            value={options.fontSize.toString()}
            onChange={handleChangeFontSize}
          />
        </div>
        <div>
          <label htmlFor="font">Font</label>
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
        <button onClick={handleClickAddPageNumbers}>Add page numbers</button>
        <button onClick={handleClickReset}>Reset</button>
      </form>
    </>
  );
};

export default TransformPages;
