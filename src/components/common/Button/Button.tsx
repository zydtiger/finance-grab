/**
 * Button component for showing a button.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { PropsWithChildren, useContext, useState } from "react";
import { ButtonProps } from "./types";
import { globalThemeContext } from "@/theme";
import { hexToHSL } from "@/utils/color";

const Button: React.FC<PropsWithChildren<ButtonProps>> = React.forwardRef(
  (
    {
      type = "default",
      size = "default",
      color,
      muted,
      children,

      ...props // html div props
    },
    ref,
  ) => {
    const theme = useContext(globalThemeContext);
    const [isHovered, setIsHovered] = useState(false);
    const primaryColor = muted ? theme.colorTextSecondary : theme.colorsHighlight[0];

    const colors = {
      primary: {
        base: {
          color: theme.colorTextInner,
          backgroundColor: color ?? primaryColor,
          borderColor: color ?? primaryColor,
        },
        hover: {
          color: theme.colorTextInner,
          backgroundColor: hexToHSL(color ?? primaryColor, 1.2),
          borderColor: hexToHSL(color ?? primaryColor, 1.2),
        },
      },
      link: {
        base: {
          color: color ?? primaryColor,
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
        hover: {
          color: hexToHSL(color ?? primaryColor, 1.5),
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
      },
      default: {
        base: {
          color: theme.colorText,
          backgroundColor: theme.colorBg,
          borderColor: theme.colorBorder,
        },
        hover: {
          color: color ?? primaryColor,
          backgroundColor: theme.colorBg,
          borderColor: color ?? primaryColor,
        },
      },
    };

    const fonts = {
      small: 11,
      large: 17,
      default: 14,
    };

    const paddings = {
      small: "3px 6px",
      large: "4px 8px",
      default: "3px 6px",
    };

    const containerStyles: React.CSSProperties = {
      userSelect: "none",
      transition: "0.2s",
      borderRadius: theme.borderRadius,
      borderWidth: 1,
      borderStyle: "solid",
      padding: paddings[size],
      fontSize: fonts[size],
      ...colors[type][isHovered ? "hover" : "base"],
    };

    return (
      <div
        {...props}
        ref={ref}
        style={{
          ...containerStyles,
          ...props.style,
        }}
        onMouseEnter={e => {
          setIsHovered(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={e => {
          setIsHovered(false);
          props.onMouseLeave?.(e);
        }}
      >
        {children}
      </div>
    );
  },
);

export default Button;
