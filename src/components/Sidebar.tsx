/**
 * The Sidebar component will have the following actions:
 * - Combine pdf files
 * - Split pdf files
 * - Add page numbers to pdf files
 * In a later stage it will have the following actions:
 * - Add watermark to pdf files
 * - Rotate pdf files
 *
 * Clicking on each action will change the action
 */
import styles from "./Sidebar.module.css";
import { Action } from "../types";
import {
  MdOutlineContentCut,
  MdOutlineRotateRight,
  MdOutlineCallMerge,
  MdOutlineFormatListNumbered,
  MdOutlineBrandingWatermark,
  MdOutlineCallSplit,
} from "react-icons/md";

interface SidebarProps {
  handleClickAction: (action: Action) => void;
  action: Action;
}

const Sidebar = ({ handleClickAction, action }: SidebarProps) => {
  return (
    <div className={styles.Sidebar}>
      <button
        disabled
        onClick={() => {}}
        className={`${styles.button} ${styles.hideInSmallScreen}`}
      >
        <MdOutlineContentCut />
        <span className={styles.span}>Remove</span>
      </button>
      <button
        disabled
        onClick={() => {}}
        className={`${styles.button} ${styles.hideInSmallScreen}`}
      >
        <MdOutlineRotateRight />
        <span className={styles.span}>Rotate</span>
      </button>
      <button
        className={`${action === "combine" ? styles.selected : undefined} ${
          styles.button
        }`}
        onClick={() => handleClickAction("combine")}
      >
        <MdOutlineCallMerge />
        <span className={styles.span}>Combine</span>
      </button>
      <button
        className={`${action === "pages" ? styles.selected : undefined} ${
          styles.button
        }`}
        onClick={() => handleClickAction("pages")}
      >
        <MdOutlineFormatListNumbered />
        <span className={styles.span}>Numbers</span>
      </button>
      <button
        disabled
        onClick={() => {}}
        className={`${styles.button} ${styles.hideInSmallScreen}`}
      >
        <MdOutlineBrandingWatermark />
        <span className={styles.span}>Watermark</span>
      </button>

      <button
        className={`${action === "split" ? styles.selected : undefined} ${
          styles.button
        }`}
        onClick={() => handleClickAction("split")}
      >
        <MdOutlineCallSplit />
        <span className={styles.span}>Split</span>
      </button>
    </div>
  );
};

export default Sidebar;
