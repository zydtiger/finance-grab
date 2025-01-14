/**
 * Animation wrapper for fading in-out.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { PropsWithChildren, useEffect, useState } from "react";
import { AnimationProps } from "./types";

const Fade: React.FC<PropsWithChildren<AnimationProps>> = ({
  isShow,
  duration = 300,
  children,
  ...divProps
}) => {
  const [isVisible, setIsVisible] = useState(isShow); // controls the opacity
  const [shouldRender, setShouldRender] = useState(isShow); // controls DOM rendering

  useEffect(() => {
    if (isShow) {
      // render the component and start fade-in
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // start fade-out
      setIsVisible(false);
      // remove from DOM after fade-out animation completes
      const timeout = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isShow, duration]);

  const styles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease`,
  };

  return (
    shouldRender && (
      <div {...divProps} style={{ ...styles, ...divProps.style }}>
        {children}
      </div>
    )
  );
};

export default Fade;
