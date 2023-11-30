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

import { useState, useEffect } from "react";
import "./index.css";
import FileSelection from "./components/FileSelection";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Transformations from "./components/Transformations";
import Cover from "./Cover";
import styles from "./App.module.css";
import { useDeviceType } from "./hooks/useDeviceType";
import { useMatchMedia } from "./hooks/useMatchMedia";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [orderFiles, setOrderFiles] = useState<number[]>([]); // This state is only used for the action "combine"
  const [action, setAction] = useState<"combine" | "split" | "pages">(
    "combine"
  );
  const [basename, setBasename] = useState<string>(
    files.length ? files[0].name.replace(/.pdf/i, "") : ""
  );
  const [dragOverStatus, setDragOverStatus] = useState<boolean>(false);

  const deviceType = useDeviceType();
  const isNarrowScreen = useMatchMedia("(max-width: 768px)");
  const isMobile = deviceType === "Mobile" || isNarrowScreen;

  const handleClickReset = () => {
    setFiles([]);
  };

  const handleKeepOutputAsInput = (files: File[]) => {
    setFiles(files);
    setOrderFiles(Array.from(Array(files.length).keys()));
  };

  const handleClickAction = (action: "combine" | "split" | "pages") => {
    setAction(action);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      event.dataTransfer.dropEffect = "copy";
      setDragOverStatus(true);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (
      event.dataTransfer &&
      event.dataTransfer.items &&
      event.dataTransfer.files.length > 0
    ) {
      if (event.dataTransfer.files[0].type === "application/pdf") {
        setFiles(Array.from(event.dataTransfer.files));
        setOrderFiles(
          Array.from(Array(event.dataTransfer.files.length).keys())
        );
      } else {
        alert("Please drop a pdf file");
      }
    }
    setDragOverStatus(false);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOverStatus(false);
  };

  return (
    <div
      className={isMobile ? styles.AppMobile : styles.App}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <header className={styles.header}>
        <Header />
      </header>
      {dragOverStatus ? (
        <Cover />
      ) : (
        <main className={isMobile ? styles.mainMobile : styles.main}>
          <Sidebar
            handleClickAction={handleClickAction}
            action={action}
            isMobile={isMobile}
          />
          <FileSelection
            files={files}
            setFiles={setFiles}
            setOrderFiles={setOrderFiles}
            handleClickReset={handleClickReset}
            action={action}
            orderFiles={orderFiles}
            isMobile={isMobile}
            setBasename={setBasename}
          />
          <Transformations
            files={files}
            action={action}
            orderFiles={orderFiles}
            isMobile={isMobile}
            handleKeepOutputAsInput={handleKeepOutputAsInput}
            basename={basename}
            setBasename={setBasename}
          />
        </main>
      )}
      {!isMobile && (
        <footer className={styles.footer}>developed by c1b3rt00lk1t</footer>
      )}
    </div>
  );
}

export default App;
