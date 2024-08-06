import { Movie, MovieListItem, MovieRecommendation, MovieTrending } from "../types/movie";
import { TvShow, TvShowRecommendation, TvShowShort } from "../types/tvShowShort";

const isMovie = (data: Movie | TvShow) => (data as Movie)?.title !== undefined
const isTvShow = (data: Movie | TvShow) => (data as TvShow)?.name !== undefined


const isMovieListItem = (data: MovieListItem | TvShowShort) => (data as MovieListItem).title !== undefined;
const isTvShowShort = (data: MovieListItem | TvShowShort) => (data as TvShowShort).name !== undefined;

// const isActorSearch = (data: MovieListItem | TvShowShort | ActorSearch) => (data as ActorSearch)?.gender !== undefined


const isMovieTrending = (data: MovieTrending | TvShowShort) => (data as MovieTrending).media_type !== undefined;

const isMovieRecommendation = (data: MovieRecommendation | TvShowRecommendation) => (data as MovieRecommendation)?.title !== undefined
const isTvShowRecommendation = (data: MovieRecommendation | TvShowRecommendation) => (data as TvShowRecommendation)?.name !== undefined

export { isMovie, isTvShow, isMovieListItem, isTvShowShort, isMovieTrending, isMovieRecommendation, isTvShowRecommendation };
