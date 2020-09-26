declare namespace jest {
    interface Matchers<R> {
        toBeValidHeap(): R;
    }
}
