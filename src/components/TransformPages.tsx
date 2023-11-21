import { useReducer } from "react";
import {
  addPageNumbers,
  addPageDefaultOptions,
  AddPageOptions,
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
    default:
      throw new Error();
  }
}

const TransformPages = ({ file }: TransformPagesProps) => {
  const [options, dispatch] = useReducer(
    addPagesReducer,
    addPageDefaultOptions
  );

  function handleChangeInitialPage(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "initialPage", value: Number(event.target.value) });
  }

  function handleChangeStartNumber(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "startNumber", value: Number(event.target.value) });
  }

  function handleClickAddPageNumbers(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    addPageNumbers(file, options);
  }

  return (
    <>
      <p>{file.name}</p>
      <form>
        <div>
          <label htmlFor="initialPage">Initial Page</label>
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
          <label htmlFor="startNumber">Start Number</label>
          <input
            type="number"
            id="startNumber"
            name="startNumber"
            value={options.startNumber.toString()}
            onChange={handleChangeStartNumber}
          />
        </div>
        <button onClick={handleClickAddPageNumbers}>Add page numbers</button>
      </form>
    </>
  );
};

export default TransformPages;
