/**
 * Field List that renders form items that require list input.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { PlusOutlined } from "@ant-design/icons";
import Button from "../../Button/Button";
import Flex from "../../Flex/Flex";
import { BasicFieldDef, BasicFieldType } from "../types";
import ListItem from "./ListItem";

interface FieldListProps {
  type: BasicFieldDef["type"];
  values?: BasicFieldType[];
  onChange: (arr: BasicFieldType[]) => void;
}

const FieldList: React.FC<FieldListProps> = ({ type, values, onChange }) => {
  const valuesNormalized = values ?? [];

  return (
    <Flex gap={10} justify="center">
      {valuesNormalized.map((item, index) => (
        <ListItem
          key={index}
          type={type}
          value={item}
          onChange={data => {
            const valuesClone = [...valuesNormalized];
            valuesClone[index] = data;
            onChange(valuesClone);
          }}
          onDelete={() => onChange(valuesNormalized.filter((_, i) => i !== index))}
        />
      ))}
      <Button
        type="primary"
        onClick={() => onChange([...valuesNormalized, ""])}
        style={{ width: 50, textAlign: "center" }}
      >
        <PlusOutlined />
      </Button>
    </Flex>
  );
};

export default FieldList;
