declare type CompareFunction<T> = (a: T, b: T) => -1 | 0 | 1;
declare type FilterFunction<T> = (currentValue: T) => boolean;
declare type MapFunction<T, U> = (currentValue: T) => U;
declare type ReduceFunction<T, U> = (accumulator: U, currentValue: T) => any;
export type { CompareFunction, FilterFunction, MapFunction, ReduceFunction, };
