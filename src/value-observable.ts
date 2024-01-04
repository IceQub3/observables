import { BaseObservable } from "./base-observable";

export class ValueObservable<T> extends BaseObservable<T> {
    private value: T;

    constructor(initialValue: T) {
        super();
        this.value = initialValue;
    }

    public get current(): T {
        return this.value;
    }

    public set current(value: T) {
        this.value = value;
        this.publisher.emit(value);
    }
}