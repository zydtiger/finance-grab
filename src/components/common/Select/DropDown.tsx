/**
 * Select DropDown child component for displaying options.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React from "react";
import { useContext, useMemo, useState } from "react";
import { getMode, globalThemeContext } from "@/theme";
import { hexToHSL } from "@/utils/color";
import { DropDownProps } from "./types";
import Scroll from "../Scroll/Scroll";
import Expand from "../Animations/Expand";

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ isShow, position, width, options, value, onChange }, ref) => {
    const theme = useContext(globalThemeContext);
    const primaryColor = useMemo(
      () =>
        getMode() === "dark"
          ? hexToHSL(theme.colorsHighlight[0], 0.5)
          : hexToHSL(theme.colorsHighlight[0], 3),
      [theme],
    );
    const accentColor = useMemo(
      () =>
        getMode() === "dark"
          ? hexToHSL(theme.colorBg, 1.2)
          : hexToHSL(theme.colorBg, 0.9),
      [theme],
    );

    const [accentIndices, setAccentIndices] = useState<number[]>([]);

    const dropDownStyles: React.CSSProperties = {
      cursor: "pointer",

      position: "absolute",
      top: position.y,
      left: position.x,
      zIndex: 1000, // lift to very high priority
      width,
      boxSizing: "border-box",

      backgroundColor: theme.colorBg,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.colorBorder,
      borderRadius: theme.borderRadius,
      boxShadow: `0 1px 4px -1px ${theme.colorBorder}`,
      color: theme.colorText,
      padding: 5,
      fontSize: 14,
    };

    return (
      <div ref={ref}>
        <Expand isShow={isShow} style={dropDownStyles}>
          <Scroll scrollMaxHeight={200}>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => onChange?.(option.value)}
                onMouseEnter={() => setAccentIndices(prev => [...prev, index])}
                onMouseLeave={() =>
                  setAccentIndices(prev => prev.filter(i => i !== index))
                }
                style={{
                  borderRadius: theme.borderRadius,
                  padding: 5,
                  backgroundColor:
                    option.value === value
                      ? primaryColor
                      : accentIndices.includes(index)
                        ? accentColor
                        : "transparent",
                }}
              >
                {option.label}
              </div>
            ))}
          </Scroll>
        </Expand>
      </div>
    );
  },
);

export default DropDown;
