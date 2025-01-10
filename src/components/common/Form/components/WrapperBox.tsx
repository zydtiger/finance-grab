/**
 * Wrapper box that wraps around complex fields.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { PropsWithChildren, useContext } from "react";
import { globalThemeContext } from "@/theme";

const WrapperBox: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useContext(globalThemeContext);

  return (
    <div
      style={{
        border: `1px solid ${theme.colorBorder}`,
        borderRadius: theme.borderRadius,
        padding: theme.boxPadding,
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};

export default WrapperBox;
