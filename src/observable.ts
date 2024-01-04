import { Topic } from "@icequb3/events";


export interface Observable<T> {
    readonly change: Topic<[T]>
    readonly current: T,

    map<U>(fn: (observable: Observable<T>) => Observable<U>): Observable<U>;
}