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

interface SidebarProps {
  handleClickAction: (action: Action) => void;
  action: Action;
}

const Sidebar = ({ handleClickAction, action }: SidebarProps) => {
  return (
    <div className={styles.Sidebar}>
      <button disabled onClick={() => {}}>
        Remove
      </button>
      <button disabled onClick={() => {}}>
        Rotate
      </button>
      <button
        className={action === "combine" ? styles.selected : undefined}
        onClick={() => handleClickAction("combine")}
      >
        Combine
      </button>
      <button
        className={action === "pages" ? styles.selected : undefined}
        onClick={() => handleClickAction("pages")}
      >
        Numbers
      </button>
      <button disabled onClick={() => {}}>
        Watermark
      </button>

      <button
        className={action === "split" ? styles.selected : undefined}
        onClick={() => handleClickAction("split")}
      >
        Split
      </button>
    </div>
  );
};

export default Sidebar;
