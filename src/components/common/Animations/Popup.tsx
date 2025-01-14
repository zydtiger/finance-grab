/**
 * Animation wrapper for popup.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { PropsWithChildren, useEffect, useState } from "react";
import { AnimationProps } from "./types";

const Popup: React.FC<PropsWithChildren<AnimationProps>> = ({
  isShow,
  duration = 300,
  children,
  ...divProps
}) => {
  const [isVisible, setIsVisible] = useState(isShow); // controls opacity and size
  const [shouldRender, setShouldRender] = useState(isShow); // controls DOM rendering

  useEffect(() => {
    if (isShow) {
      // render the component and start grow-in
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // start shrink-out
      setIsVisible(false);
      // remove from DOM after animation completes
      const timeout = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isShow, duration]);

  const styles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.5)",
    transition: `all ${duration}ms ease`,
  };

  return (
    shouldRender && (
      <div {...divProps} style={{ ...styles, ...divProps.style }}>
        {children}
      </div>
    )
  );
};

export default Popup;
