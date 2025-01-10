/**
 * Select specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { Position } from "@/types";

export interface SelectProps {
  options: Option[] | string[];
  value?: Option["value"];
  placeholder?: string;
  onChange?: (val: Option["value"]) => void;
}

export interface DropDownProps {
  position: Position;
  width: number;
  options: Option[];
  value?: Option["value"];
  onChange?: (val: Option["value"]) => void;
}

interface Option {
  label: string;
  value: string | number;
}
