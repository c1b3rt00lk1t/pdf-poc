import { useRef, useState } from "react";
import { Action } from "../types";
import styles from "./FileSelection.module.css";
import FileList from "./FileList";
import {
  MdAddCircleOutline,
  MdOutlineReplay,
  MdOutlineSortByAlpha,
} from "react-icons/md";

import { Tooltip } from "antd";

export interface FileSelectionProps {
  files: File[];
  setFiles: (files: File[]) => void;
  setOrderFiles: (orderFiles: number[]) => void;
  handleClickReset: () => void;
  action: Action;
  orderFiles: number[];
  isMobile: boolean;
  setBasename: (basename: string) => void;
}

const FileSelection = ({
  files,
  setFiles,
  setOrderFiles,
  handleClickReset,
  action,
  orderFiles,
  isMobile,
  setBasename,
}: FileSelectionProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const resetInput = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = "";
    }
  };
  const [orderAZ, setOrderAZ] = useState<number>(1);

  const handleClickAdd = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.multiple = action === "combine" ? true : false;
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        setFiles(Array.from(files));
        setOrderFiles(Array.from(Array(files.length).keys()));
        setBasename(files[0].name.replace(/.pdf/i, ""));
      }
    };
    input.click();
  };

  function handleClickOrder() {
    setOrderAZ((orderAZ) => -orderAZ);
    setOrderFiles(
      [...orderFiles]
        .map((idx) => ({ idx, name: files[idx].name }))
        .sort((a, b) => -orderAZ * a.name.localeCompare(b.name))
        .map((file) => file.idx)
    );
  }

  const plural = action === "combine" ? "s" : "";
  return (
    <div
      className={isMobile ? styles.FileSelectionMobile : styles.FileSelection}
    >
      <div className={styles.buttonGroup}>
        <Tooltip placement="top" title={`Add File${plural}`} arrow={true}>
          <button
            id="add-btn"
            className={styles.button}
            onClick={handleClickAdd}
          >
            <MdAddCircleOutline />
            <span className={styles.span}>Add</span>
          </button>
        </Tooltip>
        <Tooltip placement="top" title={`Reset File${plural}`} arrow={true}>
          <button
            id="reset-file-btn"
            className={styles.button}
            onClick={() => {
              handleClickReset();
              resetInput(refInput);
            }}
          >
            <MdOutlineReplay />
            <span className={styles.span}>Reset </span>
          </button>
        </Tooltip>
        {action === "combine" && (
          <Tooltip placement="top" title={"Order Files"} arrow={true}>
            <button
              id="sort-btn"
              className={styles.button}
              onClick={handleClickOrder}
            >
              <MdOutlineSortByAlpha />
              <span className={styles.span}>Order</span>
            </button>
          </Tooltip>
        )}
      </div>
      {files.length ? (
        <FileList
          files={files}
          setFiles={setFiles}
          orderFiles={orderFiles}
          setOrderFiles={setOrderFiles}
          showList={action === "combine"}
          isMobile={isMobile}
        />
      ) : (
        <p className={styles.instruction}>
          {`Drop some file${plural} here, or click the button above`}
        </p>
      )}
    </div>
  );
};

export default FileSelection;
