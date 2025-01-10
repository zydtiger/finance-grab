/**
 * Includes utilities for procesing string related operations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

/**
 * Capitalizes the first character of `str`.
 * @param str string to process
 * @returns string after capitalization
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
