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
  isMobile: boolean;
}

const Sidebar = ({ handleClickAction, action, isMobile }: SidebarProps) => {
  return (
    <div className={isMobile ? styles.SidebarMobile : styles.Sidebar}>
      <div
        onClick={() => {}}
        className={`${isMobile ? styles.buttonMobile : styles.button} ${
          styles.disabled
        }`}
      >
        <MdOutlineContentCut />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Remove
        </span>
      </div>
      <div
        onClick={() => {}}
        className={`${isMobile ? styles.buttonMobile : styles.button} ${
          styles.disabled
        }`}
      >
        <MdOutlineRotateRight />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Rotate
        </span>
      </div>
      <div
        className={`${action === "combine" ? styles.selected : undefined} ${
          isMobile ? styles.buttonMobile : styles.button
        }`}
        onClick={() => handleClickAction("combine")}
      >
        <MdOutlineCallMerge />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Combine
        </span>
      </div>
      <div
        className={`${action === "pages" ? styles.selected : undefined} ${
          isMobile ? styles.buttonMobile : styles.button
        }`}
        onClick={() => handleClickAction("pages")}
      >
        <MdOutlineFormatListNumbered />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Numbers
        </span>
      </div>
      <div
        onClick={() => {}}
        className={`${isMobile ? styles.buttonMobile : styles.button} ${
          styles.disabled
        }`}
      >
        <MdOutlineBrandingWatermark />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Watermark
        </span>
      </div>

      <div
        className={`${action === "split" ? styles.selected : undefined} ${
          isMobile ? styles.buttonMobile : styles.button
        }`}
        onClick={() => handleClickAction("split")}
      >
        <MdOutlineCallSplit />
        <span className={isMobile ? styles.spanMobile : styles.span}>
          Split
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
