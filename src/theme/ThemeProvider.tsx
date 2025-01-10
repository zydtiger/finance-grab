/**
 * The theme provider React element to wrap around the application root.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import React, { PropsWithChildren, useEffect, useState } from "react";
import { globalThemeContext, getTheme } from ".";

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const mediaQueryListener = () => {
      setTheme(getTheme());
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mediaQueryListener);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaQueryListener);
    };
  }, []);

  return (
    <globalThemeContext.Provider value={theme}>
      {children}
    </globalThemeContext.Provider>
  );
};

export default ThemeProvider;
