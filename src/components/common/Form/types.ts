/**
 * Form specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { SelectProps } from "../Select/types";

export interface BasicFieldDef {
  name: string;
  type: "text" | "date" | "number" | "select" | "switch";
  required: boolean;
  options?: SelectProps["options"]; // for select
}

export interface CompositeFieldDef {
  name: string;
  type: "composite";
  fields: FormFieldDef[];
}

export interface ListFieldDef {
  name: string;
  type: "list";
  dataType: BasicFieldDef["type"];
  required: boolean;
}

export type FormFieldDef = BasicFieldDef | CompositeFieldDef | ListFieldDef;
export type BasicFieldType = string | number | boolean;
export type FieldType = BasicFieldType | BasicFieldType[] | object;

export interface FormHandle<T> {
  getFormData: () => T;
}

export interface FieldHandle {
  getData: () => FieldType | undefined;
}
