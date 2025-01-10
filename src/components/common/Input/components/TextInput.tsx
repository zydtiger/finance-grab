/**
 * TextInput that shows a basic text input field.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useState } from "react";
import { globalThemeContext } from "@/theme";
import { InputProps } from "../types";
import { inputStyles } from "..";

const TextInput: React.FC<InputProps> = ({
  style,
  size,
  onTrigger,
  ...props
}) => {
  const theme = useContext(globalThemeContext);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(props.value ?? "");

  return (
    <input
      {...props}
      style={{
        ...inputStyles(theme, size, active),
        ...style,
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
  );
};

export default TextInput;
