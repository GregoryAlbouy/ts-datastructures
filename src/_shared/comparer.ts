/**
 * A function that compares two elements a and b of the same type.
 * It can be applied to any data type, including arrays or objects.
 * It should return `-1` if a considered inferior to b, `1` if superior,
 * and `zero` if considered equals.
 */
type CompareFunction<T> = (a: T, b: T) => -1 | 0 | 1

interface Comparer<T> {
    compare: CompareFunction<T>
    inf: (a: T, b: T) => boolean
    sup: (a: T, b: T) => boolean
    equal: (a: T, b: T) => boolean
    infOrEqual: (a: T, b: T) => boolean
    supOrEqual: (a: T, b: T) => boolean
    setCompareFunction: (compareFunction: CompareFunction<T>) => any
}

/**
 * The function used to compare two elements in an ordered data structure.
 * By default, it compares numbers so it must be replaced with a custom
 * function (via `setCompareFunction`) when storing another data type.
 *
 * @param a - Element a
 * @param b - Element b
 * @returns `-1` if a \< b, `1` if a \> b, `0` if a === b
 */
function compare<T>(a: T, b: T): -1 | 0 | 1 {
    return a < b ? -1 : a > b ? 1 : 0
}

/**
 * Returns `true` if a and b are equal, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function equal<T>(this: any, a: T, b: T): boolean {
    return this.compare(a, b) === 0
}

/**
 * Returns `true` if a is inferior to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function inf<T>(this: any, a: T, b: T): boolean {
    return this.compare(a, b) === -1
}

/**
 * Returns `true` if a is superior to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function sup<T>(this: any, a: T, b: T): boolean {
    return this.compare(a, b) === 1
}

/**
 * Returns `true` if a is inferior or equal to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function infOrEqual<T>(this: any, a: T, b: T): boolean {
    const value = this.compare(a, b)
    return value === -1 || value === 0
}

/**
 * Returns `true` if a is superior or equal to b, `false` otherwise.
 *
 * @param this- The hosting structure
 * @param a - Element a
 * @param b - Element b
 * @returns `true` / `false`
 */
function supOrEqual<T>(this: any, a: T, b: T): boolean {
    const value = this.compare(a, b)
    return value === 1 || value === 0
}

const compareMethods = {
    compare,
    inf,
    sup,
    equal,
    infOrEqual,
    supOrEqual,
}

export type {
    Comparer,
    CompareFunction,
}

export {
    compareMethods,
}
