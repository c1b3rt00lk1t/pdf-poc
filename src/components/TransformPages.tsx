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

  return (
    <>
      <p>{file && file.name}</p>
      <form>
        <label htmlFor="initialPage">Initial Page</label>
        <input
          type="number"
          id="initialPage"
          name="initialPage"
          value={options.initialPage}
          onChange={handleChangeInitialPage}
          placeholder={options.initialPage.toString()}
        />
      </form>
      {file && (
        <button onClick={() => addPageNumbers(file, options)}>
          Add page numbers
        </button>
      )}
    </>
  );
};

export default TransformPages;
