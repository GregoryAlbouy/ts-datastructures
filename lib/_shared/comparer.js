"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMethods = void 0;
/**
 * The function used to compare two elements in an ordered data structure.
 * By default, it compares numbers so it must be replaced with a custom
 * function (via `setCompareFunction`) when storing another data type.
 *
 * @param a - Element a
 * @param b - Element b
 * @returns `-1` if a \< b, `1` if a \> b, `0` if a === b
 */
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
/**
 * Returns `true` if a and b are equal, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function equal(a, b) {
    return this.compare(a, b) === 0;
}
/**
 * Returns `true` if a is inferior to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function inf(a, b) {
    return this.compare(a, b) === -1;
}
/**
 * Returns `true` if a is superior to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function sup(a, b) {
    return this.compare(a, b) === 1;
}
/**
 * Returns `true` if a is inferior or equal to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function infOrEqual(a, b) {
    const value = this.compare(a, b);
    return value === -1 || value === 0;
}
/**
 * Returns `true` if a is superior or equal to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function supOrEqual(a, b) {
    const value = this.compare(a, b);
    return value === 1 || value === 0;
}
const compareMethods = {
    compare,
    inf,
    sup,
    equal,
    infOrEqual,
    supOrEqual,
};
exports.compareMethods = compareMethods;
