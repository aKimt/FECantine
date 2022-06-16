export type Collection<T> = {
    _embedded: {
        [key: string]: T[]
    };
    _links: {
        (key:string): {
            href?: string
        }
    }
}