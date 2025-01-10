/**
 * Switch component that renders a nicely styled switch.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useState } from "react";
import { globalThemeContext } from "@/theme";
import { Dimensions } from "@/types";
import Flex from "../Flex/Flex";
import { SwitchProps } from "./types";

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  size = "default",
  onChange,
  label,
}) => {
  const theme = useContext(globalThemeContext);
  const [isChecked, setIsChecked] = useState(checked);

  const sizes: Record<typeof size, Dimensions> = {
    small: {
      width: 1.8 * 22,
      height: 22,
    },
    default: {
      width: 1.8 * 26,
      height: 26,
    },
    large: {
      width: 1.8 * 32,
      height: 32,
    },
  };

  const paddings: Record<typeof size, number> = {
    small: 1,
    default: 2,
    large: 3,
  };

  const backgroundStyles: React.CSSProperties = {
    ...sizes[size],
    padding: paddings[size],
    boxSizing: "border-box",
    borderRadius: 0.5 * sizes[size].height,
    backgroundColor: isChecked ? theme.colorsHighlight[0] : theme.colorBorder,
    transition: "background-color 0.2s ease",
  };

  const toggleStyles: React.CSSProperties = {
    width: sizes[size].height - 2 * paddings[size],
    height: sizes[size].height - 2 * paddings[size],
    backgroundColor: theme.colorTextInner,
    borderRadius: "50%",
    transform: `translateX(${
      isChecked ? sizes[size].width - sizes[size].height : 0
    }px)`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease",
  };

  return (
    <label>
      <Flex align="center">
        <input
          type="checkbox"
          style={{ display: "none" }}
          checked={isChecked}
          onChange={e => {
            setIsChecked(e.target.checked);
            onChange?.(e.target.checked);
          }}
        />
        <div style={backgroundStyles}>
          <div style={toggleStyles} />
        </div>
        {label && <span style={{ marginLeft: "8px" }}>{label}</span>}
      </Flex>
    </label>
  );
};

export default Switch;
