/**
 * The component will receive a set of pdf files and an array which specifies the order of the files
 * The list of files will be displayed in the order specified by the array
 * The user will be able to change the order of the files by dragging and dropping the files
 */

import styles from "./FileList.module.css";

interface FileListProps {
  files: File[];
  orderFiles: number[];
  setOrderFiles: (orderFiles: number[]) => void;
  showList: boolean;
}

const FileList = ({
  files,
  orderFiles,
  setOrderFiles,
  showList,
}: FileListProps) => {
  const handleDragStart = (event: React.DragEvent) => {
    const idx = parseInt(
      (event.currentTarget as HTMLElement).dataset.idx as string
    );
    event.dataTransfer.setData("idx", idx.toString());
    console.log(idx.toString());
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const idx1 = parseInt(event.dataTransfer.getData("idx"));
    const idx2 = parseInt(
      (event.currentTarget as HTMLElement).dataset.idx as string
    );
    /** when a file is drop on another, it takes its place and the remaining array is unshifted */
    const filtered = orderFiles.filter((_, idx) => idx !== idx1);
    const reordered = [
      ...filtered.slice(0, idx2),
      orderFiles[idx1],
      ...filtered.slice(idx2),
    ];

    setOrderFiles(reordered);
  };
  return (
    <ul onDragOver={handleDragOver} className={styles.ul}>
      {orderFiles.length > 0 && showList
        ? files.map((_, idx, arr) => (
            <li
              draggable={true}
              key={idx}
              data-idx={idx}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              className={styles.li}
            >
              {arr[orderFiles[idx]].name}
            </li>
          ))
        : files.length > 0 && <li className={styles.li}>{files[0].name}</li>}
    </ul>
  );
};

export default FileList;
