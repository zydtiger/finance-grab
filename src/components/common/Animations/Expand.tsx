/**
 * Animation wrapper for expand/collapse.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AnimationProps } from "./types";

interface ExpandProps extends AnimationProps {
  direction?: "bottom" | "right";
}

const Expand: React.FC<PropsWithChildren<ExpandProps>> = ({
  direction = "bottom",
  isShow,
  duration = 300,
  children,
  ...divProps
}) => {
  const [isVisible, setIsVisible] = useState(isShow); // controls the opacity
  const [shouldRender, setShouldRender] = useState(isShow); // controls DOM rendering
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 }); // children dimension

  // update dimension when content changes
  useEffect(() => {
    if (contentRef.current) {
      setDimension({
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
      });
    }
  }, [children, direction]);

  useEffect(() => {
    if (isShow) {
      // render the component and start expand
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // start collapse
      setIsVisible(false);
      // remove from DOM after collapse animation completes
      const timeout = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isShow, duration]);

  const styles: Record<typeof direction, React.CSSProperties> = {
    bottom: {
      height: isVisible ? `${dimension.height}px` : 0,
      overflow: "hidden",
      transition: `height ${duration}ms ease`,
    },
    right: {
      width: isVisible ? `${dimension.width}px` : 0,
      overflow: "hidden",
      transition: `width ${duration}ms ease`,
    },
  };

  return (
    shouldRender && (
      <div
        ref={contentRef}
        {...divProps}
        style={{
          ...styles[direction],
          ...divProps.style,
        }}
      >
        {children}
      </div>
    )
  );
};

export default Expand;
