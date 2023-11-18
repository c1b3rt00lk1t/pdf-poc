import styles from "./DropArea.module.css";

interface DropAreaProps {
  action: "combine" | "split" | "pages";
  files: File[];
  setFiles: (files: File[]) => void;
}

const DropArea = ({ action, files, setFiles }: DropAreaProps) => {
  const handleDragOver = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.items) {
      if (event.dataTransfer.files[0].type === "application/pdf") {
        setFiles(Array.from(event.dataTransfer.files));
      } else {
        alert("Please drop a pdf file");
      }
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.multiple = action === "combine" ? true : false;
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        setFiles(Array.from(files));
      }
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
      {files[0] ? (
        <ul>
          {files.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      ) : (
        "Drop file here or click to select"
      )}
    </div>
  );
};

export default DropArea;
