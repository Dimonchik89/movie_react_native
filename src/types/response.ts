import { Actor } from "./actor"

export interface FetchResponse<T> {
    page: number
    results: T
}

export interface FetchListResponse<T> {
    dates?: Dates
    page: number
    results: T
    total_pages: number,
    total_results: number
}

export interface Dates {
    maximum: string,
    minimum: string
}

export interface ResponseActor {
    id: number
    cast: Actor[]
    crew: Actor[]
}