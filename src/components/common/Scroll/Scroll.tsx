/**
 * Scroll component for a consistent, pretty scroll bar.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { PropsWithChildren } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { getMode } from "@/theme";
import { PropsWithStyle } from "@/types";
import { ScrollProps } from "./types";

const Scroll: React.FC<PropsWithStyle<PropsWithChildren<ScrollProps>>> = ({
  scrollHeight,
  scrollMaxHeight,
  scrollWidth,
  scrollMaxWidth,
  style, // additional styles like margins, etc.
  children,
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "leave",
          theme: getMode() === "dark" ? "os-theme-light" : "os-theme-dark", // cancel scroll bar's own dark/light adaptation
        },
      }}
      style={{
        height: scrollHeight,
        maxHeight: scrollMaxHeight,
        width: scrollWidth,
        maxWidth: scrollMaxWidth,
        ...style,
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scroll;
