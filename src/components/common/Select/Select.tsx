/**
 * Select component for a beautiful, unified select.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

// external libs
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { DownOutlined } from "@ant-design/icons";

// local libs
import { globalThemeContext } from "@/theme";
import { PropsWithStyle } from "@/types";
import assert from "@/utils/assert";
import DropDown from "./DropDown";
import Flex from "../Flex/Flex";

// type declarations
import { SelectProps } from "./types";

const Select: React.FC<PropsWithStyle<SelectProps>> = ({
  options,
  value,
  placeholder = "Select...",
  onChange,
  style,
}) => {
  const theme = useContext(globalThemeContext);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(value);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const notInSelect =
        selectRef.current && !selectRef.current.contains(event.target as Node);
      const notInDropDown =
        dropDownRef.current && !dropDownRef.current.contains(event.target as Node);

      if (notInSelect && notInDropDown) {
        setIsActive(false);
      }
    }

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  const calcDropDownPosition = useCallback(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();

      return {
        x: window.scrollX + rect.left,
        y: window.scrollY + rect.top + rect.height + 5,
      };
    } else {
      return { x: 0, y: 0 };
    }
  }, [selectRef]);

  const calcDropDownWidth = useCallback(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      return rect.width;
    } else {
      return 0;
    }
  }, [selectRef]);

  const optionsMemo = useMemo(() => {
    const optionsProcessed = options.map(option => {
      if (typeof option === "string") {
        return {
          value: option,
          label: option,
        };
      } else return option;
    });

    const values = optionsProcessed.map(option => option.value);
    assert(
      new Set(values).size === values.length,
      "Select options must have unique values",
    );

    return optionsProcessed;
  }, [options]);

  const SelectParent: React.FC<PropsWithChildren> = ({ children }) => {
    const selectStyles: React.CSSProperties = {
      cursor: "pointer",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      minWidth: 100,

      backgroundColor: theme.colorBg,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.colorBorder,
      borderRadius: theme.borderRadius,
      color: isActive ? theme.colorTextSecondary : theme.colorText,
      padding: 5,
      fontSize: 14,

      ...style,
    };

    return (
      <div
        ref={selectRef}
        style={selectStyles}
        onClick={() => setIsActive(prev => !prev)}
      >
        {children}
      </div>
    );
  };

  const SelectInner = () => (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      {optionsMemo.find(option => option.value === selected)?.label ?? ( // if no value selected, show placeholder
        <span style={{ color: theme.colorTextSecondary }}>{placeholder}</span>
      )}
      <DownOutlined />
    </Flex>
  );

  return (
    <SelectParent>
      <SelectInner />
      {ReactDOM.createPortal(
        <DropDown
          isShow={isActive}
          ref={dropDownRef}
          position={calcDropDownPosition()}
          width={calcDropDownWidth()}
          options={optionsMemo}
          value={selected}
          onChange={val => {
            setSelected(val);
            onChange?.(val);
          }}
        />,
        document.body,
      )}
    </SelectParent>
  );
};

export default Select;
