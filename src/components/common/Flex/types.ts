/**
 * Flex specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface FlexProps extends React.HTMLProps<HTMLDivElement> {
  vertical?: boolean;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  wrap?: React.CSSProperties["flexWrap"];
  inline?: boolean;
  gap?: React.CSSProperties["gap"];
}
