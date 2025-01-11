/**
 * Animation wrapper specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface AnimationProps extends React.HTMLProps<HTMLDivElement> {
  isShow: boolean; // controls whether the child component is visible
  duration?: number; // duration of the fade animation in milliseconds
}
