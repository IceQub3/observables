import { Publisher, Topic } from "@icequb3/events";
import { Observable } from "./observable";

export abstract class BaseObservable<T> implements Observable<T> {
    protected publisher = new Publisher<[T]>({
        handleError: (error, context?) => this.errorPublisher.emit(error, context)
    });

    protected errorPublisher = new Publisher<[unknown, unknown]>({});

    public map<U>(fn: (observable: Observable<T>) => Observable<U>): Observable<U> {
        return fn(this);
    }

    public get change(): Topic<[T]> {
        return this.publisher;
    }

    public get error(): Topic<[unknown, unknown]> {
        return this.errorPublisher;
    }

    public abstract get current(): T;
}