export interface ResponseSchema<T> {
    status : boolean,
    data : T
}

export interface User {
    id: number,
    user_id : bigint,
    user_name : string
}