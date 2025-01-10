/**
 * Input adapter that chooses the correct component.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { InputProps } from "./types";
import TextInput from "./components/TextInput";
import NumberInput from "./components/NumberInput";
import SearchInput from "./components/SearchInput";
import DateInput from "./components/DateInput";

const Input: React.FC<InputProps> = ({ type = "text", ...props }) => {
  const componentMap: Record<typeof type, React.ComponentType<InputProps>> = {
    text: TextInput,
    number: NumberInput,
    search: SearchInput,
    date: DateInput,
  };
  const Component = componentMap[type];
  return <Component {...props} />;
};

export default Input;
