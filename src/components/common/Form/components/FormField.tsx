/**
 * Form Field that renders handles states for all form fields.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormFieldDef,
  FieldHandle,
  FieldType,
  FormHandle,
  BasicFieldType,
} from "../types";
import createForm from "../Form";
import WrapperBox from "./WrapperBox";
import BasicField from "./BasicField";
import FieldList from "./FieldList";

interface FormFieldProps {
  field: FormFieldDef;
  defaultValue: FieldType;
}

const FormField = React.forwardRef<FieldHandle, FormFieldProps>(
  ({ field, defaultValue }, ref) => {
    const [value, setValue] = useState(defaultValue);
    // this is a ref to the inner form if field is composite
    const innerformRef = useRef<FormHandle<object>>(null);

    useImperativeHandle(ref, () => ({
      getData: () => {
        if (innerformRef.current) return innerformRef.current.getFormData();
        else return value;
      },
    }));

    if (field.type === "composite") {
      const InnerForm = createForm(field.fields, value as object);
      return (
        <WrapperBox>
          <InnerForm ref={innerformRef} />
        </WrapperBox>
      );
    } else if (field.type === "list") {
      return (
        <WrapperBox>
          <FieldList
            type={field.dataType}
            values={value as BasicFieldType[]}
            onChange={setValue}
          />
        </WrapperBox>
      );
    } else
      return (
        <BasicField
          type={field.type}
          value={value as BasicFieldType}
          options={field.options}
          onChange={setValue}
        />
      );
  }
);

export default FormField;
