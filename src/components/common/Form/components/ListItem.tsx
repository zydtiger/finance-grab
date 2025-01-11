/**
 * List Item that renders Basic Field for List.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { DeleteOutlined } from "@ant-design/icons";
import Button from "../../Button/Button";
import Flex from "../../Flex/Flex";
import { BasicFieldDef, BasicFieldType } from "../types";
import BasicField from "./BasicField";

interface ListItemProps {
  type: BasicFieldDef["type"];
  value?: BasicFieldType;
  onChange: (data: BasicFieldType) => void;
  onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ type, value, onChange, onDelete }) => {
  return (
    <Flex align="center" style={{ width: "100%" }}>
      <BasicField type={type} value={value} onChange={onChange} />
      <Button type="link" onClick={onDelete}>
        <DeleteOutlined />
      </Button>
    </Flex>
  );
};

export default ListItem;
