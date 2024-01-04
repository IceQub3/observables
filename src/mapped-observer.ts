import { Observable } from "./observable";
import { ValueObservable } from "./value-observable";

export class MappedObserver<S, T> extends ValueObservable<T> {
    constructor(
        private readonly source: Observable<S>,
        private readonly projection: (source: S) => T,
        private readonly compare: (previous: T, next: T) => boolean,
    ) {
        super(projection(source.current));

        source.change.subscribe(this.onSourceChange, this);
    }


    public close() {
        this.source.change.unsubscribe(this.onSourceChange);
    }

    private onSourceChange(nextValue: S): void {
        const nextProjection = this.projection(nextValue);

        if (!this.compare(this.current, nextProjection)) {
            this.current = nextProjection;
        }
    }
}

export function project<S, T>(
    projection: (source: S) => T,
    compare: (previous: T, next: T) => boolean = (a, b) => a === b
) {
    return (source: Observable<S>) => new MappedObserver(source, projection, compare);
}