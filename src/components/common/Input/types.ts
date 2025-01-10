/**
 * Input specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export type SizeType = "small" | "default" | "large";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  type?: "text" | "number" | "search" | "date"; // subset of the html input types that currently work
  size?: SizeType;
  value?: string;
  onTrigger?: (value: string) => void; // when the input is triggered (e.g. enter key)
}
