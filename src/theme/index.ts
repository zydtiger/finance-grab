/**
 * The global theme context for the application. Other scripts
 * may import the context here to get the global theme.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { createContext } from "react";
import { lightMode, darkMode } from "./data/default.ts";

export const getMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getTheme = () => (getMode() === "dark" ? darkMode : lightMode);

export const globalThemeContext = createContext(getTheme());
