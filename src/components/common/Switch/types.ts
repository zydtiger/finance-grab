/**
 * Switch specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface SwitchProps {
  checked?: boolean;
  size?: "small" | "default" | "large";
  onChange?: (checked: boolean) => void;
  label?: string;
}
