import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {MoviesSliderBlock} from '../../components';
import {LANGUAGE} from '../../constants';
import {colors} from '../../helpers/colors';
import fetchData from '../../services/api';
import {MovieTrending} from '../../types/movie';
import {FetchResponse} from '../../types/response';
import {RootStackParamsTabsList} from '../../types/tabs';
import {TvShowShort} from '../../types/tvShowShort';

interface HomeScreenProps
  extends NativeStackScreenProps<RootStackParamsTabsList, 'HomeScreen'> {}

const trendsButtons = [
  {title: 'День', path: 'day'},
  {title: 'Тиждень', path: 'week'},
];
const popularsButtons = [
  {title: 'В ефiрi сьогодні', path: 'airing_today'},
  {title: 'В ефiрi', path: 'on_the_air'},
];

const tvPopularButton = [
  {title: 'Популярнi', path: 'popular'},
  {title: 'Самi популярнi', path: 'top_rated'},
];

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [filmPeriod, setFilmsPeriod] = useState(trendsButtons[0].path);
  const [popularOn, setPopularOn] = useState(popularsButtons[0].path);
  const [tvPopular, setTvPopularOn] = useState(tvPopularButton[0].path);

  const {
    data: trendsMovies,
    isError: isTrendingError,
    error: trendingError,
    isLoading: isTrendingLoading,
  } = useQuery({
    queryKey: ['period', filmPeriod],
    queryFn: () =>
      fetchData<FetchResponse<MovieTrending[]>>(
        `https://api.themoviedb.org/3/trending/movie/${filmPeriod}?language=${LANGUAGE}`,
      ),
  });
  const {
    data: popularMovies,
    isError: isPopularError,
    error: popularError,
    isLoading: isPopularLoading,
  } = useQuery({
    queryKey: ['popular', popularOn],
    queryFn: () =>
      fetchData<FetchResponse<TvShowShort[]>>(
        `https://api.themoviedb.org/3/tv/${popularOn}?language=${LANGUAGE}`,
      ),
  });
  const {
    data: tvPopularMovies,
    isError: isTvPopularError,
    error: tvPopularError,
    isLoading: isTvPopularLoading,
  } = useQuery({
    queryKey: ['tvPopular', tvPopular],
    queryFn: () =>
      fetchData<FetchResponse<TvShowShort[]>>(
        `https://api.themoviedb.org/3/tv/${tvPopular}?language=${LANGUAGE}`,
      ),
  });

  const handleChangePeriod = useCallback(
    (str: string) => {
      setFilmsPeriod(str);
    },
    [filmPeriod],
  );

  const handleChangePopular = useCallback(
    (str: string) => {
      setPopularOn(str);
    },
    [popularOn],
  );

  const handleChangeTvPopular = useCallback(
    (str: string) => {
      setTvPopularOn(str);
    },
    [popularOn],
  );

  return (
    <ScrollView style={styles.root}>
      <MoviesSliderBlock
        active={filmPeriod}
        handleChangeActive={handleChangePeriod}
        isError={isTrendingError}
        isLoading={isTrendingLoading}
        title="Тренди"
        error={trendingError}
        buttons={trendsButtons}
        movies={trendsMovies?.results!}
      />
      <MoviesSliderBlock
        active={popularOn}
        handleChangeActive={handleChangePopular}
        isError={isPopularError}
        isLoading={isPopularLoading}
        title="ТВ"
        error={popularError}
        buttons={popularsButtons}
        movies={popularMovies?.results!}
      />
      <MoviesSliderBlock
        active={tvPopular}
        handleChangeActive={handleChangeTvPopular}
        isError={isTvPopularError}
        isLoading={isTvPopularLoading}
        title="ТВ"
        error={tvPopularError}
        buttons={tvPopularButton}
        movies={tvPopularMovies?.results!}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
  },
  switcherWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switcherTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    borderColor: colors.darkBlue,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: colors.darkBlue,
    color: colors.white,
  },
  buttonText: {
    color: colors.darkBlue,
  },
  buttonTextActive: {
    color: colors.white,
  },
});
