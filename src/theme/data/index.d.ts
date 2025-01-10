/**
 * Describes how the theme type has to be structured.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface Theme {
  boxPadding: number;
  borderRadius: number;

  colorBg: string;
  colorBgSecondary: string;

  colorText: string;
  colorTextSecondary: string;
  colorTextInner: string;

  colorBorder: string;

  colorsHighlight: string[];
}
