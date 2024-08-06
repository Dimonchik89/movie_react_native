export interface Actor {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface ActorInfo {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: any
    gender: number
    homepage: any
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
}
export interface ActorExternal {
    id: number
    freebase_mid: string
    freebase_id: string
    imdb_id: string
    tvrage_id: number
    wikidata_id: string
    facebook_id: string
    instagram_id: string
    tiktok_id: string
    twitter_id: string
    youtube_id: string
}