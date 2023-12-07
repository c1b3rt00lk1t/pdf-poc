/**
 * The component will receive a set of pdf files and an array which specifies the order of the files
 * The list of files will be displayed in the order specified by the array
 * The user will be able to change the order of the files by dragging and dropping the files
 */

import styles from "./FileList.module.css";
import { MdDelete } from "react-icons/md";

export interface FileListProps {
  files: File[];
  setFiles: (files: File[]) => void;
  orderFiles: number[];
  setOrderFiles: (orderFiles: number[]) => void;
  showList: boolean;
  isMobile: boolean;
}

const FileList = ({
  files,
  setFiles,
  orderFiles,
  setOrderFiles,
  showList,
  isMobile,
}: FileListProps) => {
  const handleDragStart = (event: React.DragEvent) => {
    const idx = parseInt(
      (event.currentTarget as HTMLElement).dataset.idx as string
    );
    event.dataTransfer.setData("idx", idx.toString());
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

  function handleClickRemoveItem(event: React.MouseEvent) {
    const idx = parseInt(
      (event.currentTarget as HTMLElement).parentElement!.dataset.idx as string
    );
    const filtered = orderFiles.slice(0, idx).concat(orderFiles.slice(idx + 1));
    setFiles(files.filter((_, idx) => filtered.includes(idx)));
    setOrderFiles(Array.from(Array(filtered.length).keys()));
  }

  return (
    <ul
      id="file-list"
      onDragOver={handleDragOver}
      className={isMobile ? styles.ulMobile : styles.ul}
    >
      {orderFiles.length > 0 && showList
        ? files.map((_, idx, arr) => (
            <li
              draggable={true}
              key={idx}
              data-idx={idx}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              className={isMobile ? styles.liMobile : styles.li}
            >
              <span className={styles.span}>
                <a
                  className={styles.a}
                  href={URL.createObjectURL(arr[orderFiles[idx]])}
                  target="_blank"
                >
                  {arr[orderFiles[idx]].name}
                </a>
              </span>
              <MdDelete
                className={styles.delete}
                onClick={handleClickRemoveItem}
              />
            </li>
          ))
        : files.length > 0 && (
            <li className={isMobile ? styles.liMobile : styles.li}>
              <span className={styles.span}>
                <a
                  className={styles.a}
                  href={URL.createObjectURL(files[0])}
                  target="_blank"
                >
                  {files[0].name}
                </a>
              </span>
            </li>
          )}
    </ul>
  );
};

export default FileList;
