type CompareFunction<T> = (a: T, b: T) => -1 | 0 | 1

type FilterFunction<T> =
    (currentValue: T) => boolean

type MapFunction<T, U> =
    (currentValue: T) => U

type ReduceFunction<T, U> =
    (accumulator: U, currentValue: T) => U

export type {
    CompareFunction,
    FilterFunction,
    MapFunction,
    ReduceFunction,
}
