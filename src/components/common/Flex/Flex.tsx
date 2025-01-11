/**
 * Flex component for layout.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React from "react";
import { PropsWithChildren } from "react";
import { FlexProps } from "./types";

const Flex: React.ForwardRefExoticComponent<PropsWithChildren<FlexProps>> =
  React.forwardRef(
    (
      {
        vertical,
        justify = "flex-start",
        align = "flex-start",
        wrap = "wrap",
        inline = false,
        gap = 0,
        children,

        style,
        ...props // html div props
      },
      ref,
    ) => {
      return (
        <div
          ref={ref}
          style={{
            display: inline ? "inline-flex" : "flex",
            flexDirection: vertical ? "column" : "row",
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap,
            gap,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    },
  );

export default Flex;
