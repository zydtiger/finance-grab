/**
 * Basic Field that proceses select, switch, and input.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import Select from "../../Select/Select";
import Input from "../../Input/Input";
import Switch from "../../Switch/Switch";
import { BasicFieldType, BasicFieldDef } from "../types";

interface BasicFieldProps {
  type: BasicFieldDef["type"];
  options?: BasicFieldDef["options"];
  value?: BasicFieldType;
  onChange: (data: BasicFieldType) => void;
}

const BasicField: React.FC<BasicFieldProps> = ({
  type,
  options,
  value,
  onChange,
}) => {
  if (type === "select") {
    return (
      <Select
        style={{ flex: 1 }}
        options={options!}
        onChange={onChange}
        value={value as string | number}
      />
    );
  } else if (type === "switch") {
    return <Switch checked={value as boolean} onChange={onChange} />;
  } else {
    return (
      <Input
        type={type}
        style={{ flex: 1 }}
        onChange={(e) => {
          if (type === "number") onChange(Number(e.target.value));
          else onChange(e.target.value);
        }}
        value={value as string}
      />
    );
  }
};

export default BasicField;
