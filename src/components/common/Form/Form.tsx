/**
 * Form component that renders a generic form.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { useContext, useImperativeHandle, useRef } from "react";
import { globalThemeContext } from "@/theme";
import { capitalize } from "@/utils/string";
import Flex from "../Flex/Flex";
import { FormHandle, FormFieldDef, FieldHandle, FieldType } from "./types";
import FormField from "./components/FormField";

// helper functions
const isRequired = (field: FormFieldDef): boolean => {
  return field.type !== "composite" && field.required;
};

const isEmptyValue = (value: unknown): boolean => {
  return (
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
};

const validateRequiredField = (field: FormFieldDef, value: unknown): boolean => {
  if (isRequired(field) && isEmptyValue(value)) return false;
  return true;
};

const createForm = <T extends object>(scheme: FormFieldDef[], defaultValue?: T) => {
  return React.forwardRef<FormHandle<T>>((_props, ref) => {
    const theme = useContext(globalThemeContext);

    const inputRefsMap = useRef(new Map<string, FieldHandle>());
    const setInputRef = (name: string) => (element: FieldHandle | null) => {
      if (element) {
        inputRefsMap.current.set(name, element);
      } else {
        inputRefsMap.current.delete(name); // when unmount, delete ref from map
      }
    };

    useImperativeHandle(ref, () => ({
      getFormData: () => {
        const formData = {} as T;
        for (const field of scheme) {
          const value = inputRefsMap.current.get(field.name)?.getData();
          if (!validateRequiredField(field, value)) {
            throw new Error(
              `Missing required field in form: ${capitalize(field.name)}`
            );
          }
          formData[field.name as keyof T] = value as T[keyof T];
        }
        return formData;
      },
    }));

    return (
      <Flex gap={10}>
        {scheme.map(field => (
          <Flex key={field.name} align="center" style={{ width: "100%" }}>
            <p style={{ fontSize: 14, width: 80, color: theme.colorText }}>
              {/* format camel case names */}
              {capitalize(field.name.replace(/([A-Z])/g, " $1"))}
              {isRequired(field) && <span style={{ color: "red" }}>*</span>}
            </p>
            <Flex style={{ marginLeft: 10, flex: 1 }}>
              <FormField
                ref={setInputRef(field.name)}
                field={field}
                defaultValue={defaultValue?.[field.name as keyof T] as FieldType}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  });
};

export default createForm;
