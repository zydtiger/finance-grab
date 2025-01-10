/**
 * Shared type declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type PropsWithStyle<P = unknown> = P & { style?: React.CSSProperties };

export const DownloaderTypes = [
  "history",
  "intraday",
  "income",
  "cashflow",
  "balance",
  "sec",
  "tags",
  "metainfo",
  "news",
] as const;

export type DownloaderType = (typeof DownloaderTypes)[number];
