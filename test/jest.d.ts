declare namespace jest {
    interface Matchers<R> {
        toBeValidHeap(isMin?: boolean): R;
    }
}
