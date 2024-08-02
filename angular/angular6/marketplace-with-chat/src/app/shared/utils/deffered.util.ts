/** Implements a Deferred, a simple way to create promises. */
export class Deferred<T> {
    public promise: Promise<T>;
    public resolve: (result: T | PromiseLike<T>) => void;
    public reject: (reason: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}