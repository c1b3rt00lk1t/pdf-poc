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

import { ChangeEvent, useState } from "react";
import "./index.css";
import DropArea from "./components/DropArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Transformations from "./components/Transformations";
import styles from "./App.module.css";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(Array.from(event.target.files));
      console.log(event.target.files[0]);
    }
  };
  const handleClickReset = () => {
    setFiles([]);
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <Sidebar />
        <DropArea
          handleChangeInput={handleChangeInput}
          handleClickReset={handleClickReset}
        />
        <Transformations files={files} action={"pages"} />
      </main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}

export default App;
