/**
 * Includes utilities for procesing color related operations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

/**
 * Converts hex representation to rgb representation
 * @param hex the hex color string e.g. `#3f4056`
 * @returns rgb string
 */
export function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converts hex representation to rgb representation
 * with an alpha cue.
 * @param hex the hex color string e.g. `#3f4056`
 * @returns rgba string
 */
export function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converts hex representation to hsl representation.
 * @param hex the hex color string e.g. `#3f4056`
 * @param lightnessBoost optional: boosts the lightness of the resulting hsl color
 * @returns hsl string
 */
export function hexToHSL(hex: string, lightnessBoost: number = 1) {
  // Extract rgb components from the hexadecimal color code
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Normalize rgb components to the 0-1 range
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Determine the maximum and minimum normalized component values
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);

  // Calculate the lightness
  let l = (max + min) / 2;
  if (lightnessBoost > 1) {
    l = 1 - (1 - l) / lightnessBoost;
  } else if (lightnessBoost < 1) {
    l = l * lightnessBoost;
  }

  // Calculate the saturation
  let s: number;
  if (max === min) {
    s = 0;
  } else {
    s = (max - min) / (1 - Math.abs(max + min - 1));
  }

  // Calculate the hue
  let h: number;
  if (max === min) {
    h = 0;
  } else {
    if (max === rNorm) {
      h = (gNorm - bNorm) / (max - min);
    } else if (max === gNorm) {
      h = 2 + (bNorm - rNorm) / (max - min);
    } else {
      h = 4 + (rNorm - gNorm) / (max - min);
    }
  }

  // Adjust the hue range to ensure it is within 0-360 degrees
  h *= 60;
  if (h < 0) {
    h += 360;
  }

  // Return the hsl color string
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
}
