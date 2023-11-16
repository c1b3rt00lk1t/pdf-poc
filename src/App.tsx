/**
 * This app will allow users to manipulated pdf files. The user will be able to do (at first) the following:
 * - Combine pdf files
 * - Split pdf files
 * - Add page numbers to pdf files
 * It will use the following libraries: pdf-lib, react-pdf, react-dropzone
 * It will have light and dark mode
 * The home page has to display the three actions the user can do
 * The App must have a Layout, Header, Footer and Sidebar components that will be used in all pages
 * The App must work offline and online
 */

import "./App.css";
import { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <div className="App">hello world</div>
    </Fragment>
  );
}

export default App;
