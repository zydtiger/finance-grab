/**
 * SearchInput that shows a search text input field.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { globalThemeContext } from "@/theme";
import Button from "@/components/common/Button/Button";
import Flex from "@/components/common/Flex/Flex";

import { InputProps } from "../types";
import { fonts, heights, inputStyles } from "..";

const SearchInput: React.FC<InputProps> = ({
  style,
  size = "default",
  onTrigger,
  ...props
}) => {
  const theme = useContext(globalThemeContext);
  const width = style?.width ?? 200;

  const [active, setActive] = useState(false);
  const [value, setValue] = useState(props.value ?? "");

  return (
    <Flex inline align="center" style={{ width, ...style }}>
      <input
        {...props}
        type="search"
        style={{
          ...inputStyles(theme, size, active),
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRightWidth: 0,
          width:
            typeof width === "number"
              ? width - heights[size]
              : `calc(${width} - ${heights[size]}px)`,
        }}
        onFocus={(e) => {
          setActive(true);
          props.onFocus?.(e); // propagate upwards
        }}
        onBlur={(e) => {
          setActive(false);
          props.onBlur?.(e);
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onTrigger?.(value);
          props.onKeyDown?.(e);
        }}
      />
      <Button
        type="primary"
        onClick={() => onTrigger?.(value)}
        style={{
          width: heights[size],
          height: heights[size],
          fontSize: fonts[size],
          boxSizing: "border-box",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Flex
          justify="center"
          align="center"
          style={{ width: "100%", height: "100%" }}
        >
          <SearchOutlined />
        </Flex>
      </Button>
    </Flex>
  );
};

export default SearchInput;
