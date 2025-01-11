/**
 * Shared input configurations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { Theme } from "@/theme/data";
import { SizeType } from "./types";

export function inputStyles(
  theme: Theme,
  size: SizeType = "default",
  active = false,
): React.CSSProperties {
  return {
    outline: "none",
    boxSizing: "border-box",
    transition: "0.2s ease",
    background: theme.colorBg,
    color: theme.colorText,

    padding: paddings[size],
    fontSize: fonts[size],
    height: heights[size],

    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: theme.borderRadius,
    borderColor: active ? theme.colorsHighlight[0] : theme.colorBorder,
    boxShadow: active ? `0 0 8px -2px ${theme.colorsHighlight[0]}` : undefined,
  };
}

export const heights: Record<SizeType, number> = {
  small: 24,
  default: 30,
  large: 35,
};

const paddings: Record<SizeType, number> = {
  small: 3,
  default: 4,
  large: 6,
};

export const fonts: Record<SizeType, number> = {
  small: 12,
  default: 14,
  large: 18,
};
