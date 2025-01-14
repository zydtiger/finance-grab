/**
 * Modal for popup window.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { PropsWithChildren, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseOutlined } from "@ant-design/icons";
import { globalThemeContext } from "@/theme";
import { hexToRGBA } from "@/utils/color";
import Flex from "../Flex/Flex";
import Scroll from "../Scroll/Scroll";
import Button from "../Button/Button";
import Fade from "../Animations/Fade";
import Popup from "../Animations/Popup";
import { ModalProps } from "./types";

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  position,
  dimensions = { width: 600, height: 400 },
  buttons = ["Confirm", "Cancel"],
  defaultButton = 0,
  onClose,
  children,
}) => {
  const theme = useContext(globalThemeContext);

  // enter triggers default button
  useEffect(() => {
    const handleDefault = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onClose?.(defaultButton);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleDefault);
    }

    return () => {
      document.removeEventListener("keydown", handleDefault);
    };
  }, [isOpen, onClose, defaultButton]);

  const ModalHeader = () => (
    <Flex
      justify="flex-end"
      align="center"
      style={{
        height: 30,
        borderBottom: `1px solid ${theme.colorBorder}`,
      }}
    >
      <Button type="link" onClick={() => onClose?.(-1)} muted>
        <CloseOutlined />
      </Button>
    </Flex>
  );

  const ModalContent = () => (
    <Scroll
      scrollHeight="calc(100% - 70px)"
      style={{
        width: "100%",
        padding: theme.boxPadding,
        boxSizing: "border-box",
      }}
    >
      {children}
    </Scroll>
  );

  const ModalFooter = () => (
    <Flex
      justify="flex-end"
      align="center"
      gap={10}
      style={{
        height: 40,
        borderTop: `1px solid ${theme.colorBorder}`,
        paddingRight: 10,
      }}
    >
      {buttons.map((btn, index) => {
        return (
          <Button
            key={index}
            type={defaultButton === index ? "primary" : "default"}
            onClick={() => onClose?.(index)}
          >
            {btn}
          </Button>
        );
      })}
    </Flex>
  );

  const ModalBox = () => (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: theme.colorBg,
      }}
    >
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </div>
  );

  const Backdrop = () => (
    <div
      style={{
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: hexToRGBA(theme.colorBg, 0.4),
      }}
      onClick={() => onClose?.(-1)}
    ></div>
  );

  return ReactDOM.createPortal(
    <>
      <Fade isShow={isOpen}>
        <Backdrop />
      </Fade>
      <Popup
        isShow={isOpen}
        style={{
          zIndex: 101,
          position: "fixed",
          top: position?.y ?? `calc(50vh - ${dimensions.height / 2}px)`,
          left: position?.x ?? `calc(50vw - ${dimensions.width / 2}px)`,
          width: dimensions.width,
          height: dimensions.height,
          boxShadow: `1px 1px 4px -2px ${theme.colorBorder}`,
          border: `1px solid ${theme.colorBorder}`,
          borderRadius: theme.borderRadius,
          overflow: "hidden",
        }}
      >
        <ModalBox />
      </Popup>
    </>,
    document.body,
  );
};

export default Modal;
