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
import { Tooltip } from "antd";

export interface SidebarProps {
  handleClickAction: (action: Action) => void;
  action: Action;
  isMobile: boolean;
}

const Sidebar = ({ handleClickAction, action, isMobile }: SidebarProps) => {
  return (
    <div className={isMobile ? styles.SidebarMobile : styles.Sidebar}>
      <Tooltip
        placement="top"
        title={"Coming soon"}
        arrow={true}
        color={"grey"}
      >
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
      </Tooltip>
      <Tooltip placement="top" title={"Rotate page(s)"} arrow={true}>
        <div
          onClick={() => handleClickAction("rotate")}
          className={`${action === "rotate" ? styles.selected : undefined} ${
            isMobile ? styles.buttonMobile : styles.button
          }`}
        >
          <MdOutlineRotateRight />
          <span className={isMobile ? styles.spanMobile : styles.span}>
            Rotate
          </span>
        </div>
      </Tooltip>
      <Tooltip placement="top" title={"Combine files"} arrow={true}>
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
      </Tooltip>
      <Tooltip placement="top" title={"Page numbers"} arrow={true}>
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
      </Tooltip>
      <Tooltip
        placement="top"
        title={"Coming soon"}
        arrow={true}
        color={"grey"}
      >
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
      </Tooltip>

      <Tooltip placement="top" title={"Split file"} arrow={true}>
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
      </Tooltip>
    </div>
  );
};

export default Sidebar;
