/**
 * Button specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
  type?: "default" | "primary" | "link";
  size?: "small" | "default" | "large";
  color?: string;
  muted?: boolean; // use gray colors for all
}
