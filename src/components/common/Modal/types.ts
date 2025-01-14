/**
 * Modal specific type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { Dimensions, Position } from "@/types";

export interface ModalProps {
  isOpen: boolean;
  position?: Position;
  dimensions?: Dimensions;
  buttons?: React.ReactNode[];
  defaultButton?: number; // index of the default button
  onClose?: (button: number) => void; // index of activated button, -1 if closed
}
