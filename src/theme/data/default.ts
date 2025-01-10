/**
 * The default theme for the application.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { Theme } from ".";

const lightMode: Theme = {
  boxPadding: 10,
  borderRadius: 3,

  colorBg: "#ffffff",
  colorBgSecondary: "#f0f0f0",

  colorText: "#000000",
  colorTextSecondary: "#8c8c8c",
  colorTextInner: "#ffffff",

  colorBorder: "#bfbfbf",

  colorsHighlight: ["#4096ff", "#fa8c16", "#9254de", "#f5222d", "#389e0d"],
};

const darkMode: Theme = {
  boxPadding: 10,
  borderRadius: 3,

  colorBg: "#1f1f1f",
  colorBgSecondary: "#000000",

  colorText: "#ffffff",
  colorTextSecondary: "#8c8c8c",
  colorTextInner: "#ffffff",

  colorBorder: "#595959",

  colorsHighlight: ["#4096ff", "#fa8c16", "#9254de", "#f5222d", "#389e0d"],
};

export { lightMode, darkMode };
