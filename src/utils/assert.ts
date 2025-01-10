/**
 * Includes utilities for assertions.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

/**
 * Asserts some condition is met.
 * @param expr expression to test for
 * @param message error message
 */
export default function assert(expr: boolean, message?: string) {
  if (!expr) {
    throw new Error(message ?? "unknown assertion error!");
  }
}
