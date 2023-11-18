import styles from "./DropArea.module.css";
import { useState } from "react";

const DropArea = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    console.log(event.dataTransfer.files[0]);
    if (event.dataTransfer && event.dataTransfer.items) {
      if (event.dataTransfer.files[0].type === "application/pdf") {
        setFile(event.dataTransfer.files[0]);
      } else {
        alert("Please drop a pdf file");
      }
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = (event) => {
      setFile((event.target as HTMLInputElement).files![0]);
    };
    input.click();
  };

  return (
    <div
      className={styles.DropArea}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {file ? file.name : "Drop file here or click to select"}
    </div>
  );
};

export default DropArea;
