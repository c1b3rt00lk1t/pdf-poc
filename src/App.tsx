/**
 * This app will allow users to manipulated pdf files. The user will be able to do (at first) the following:
 * - Combine pdf files
 * - Split pdf files
 * - Add page numbers to pdf files
 * It will use the following libraries: pdf-lib
 * It will have light and dark mode
 * The home page has to display the three actions the user can do
 * The App must have a Layout, Header, Footer and Sidebar components that will be used in all pages
 * The App must work offline and online
 */

import { useState } from "react";
import "./index.css";
import FileSelection from "./components/FileSelection";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Transformations from "./components/Transformations";
import styles from "./App.module.css";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [action, setAction] = useState<"combine" | "split" | "pages">("pages");

  const handleClickReset = () => {
    setFiles([]);
  };

  const handleClickAction = (action: "combine" | "split" | "pages") => {
    setAction(action);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  };

  return (
    <div className={styles.App} onDragOver={handleDragOver}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <Sidebar handleClickAction={handleClickAction} />
        <FileSelection
          files={files}
          setFiles={setFiles}
          handleClickReset={handleClickReset}
          action={action}
        />
        <Transformations files={files} action={action} />
      </main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}

export default App;
