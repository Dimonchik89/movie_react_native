import {useQuery} from '@tanstack/react-query';
import {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {
  ButtonSwitcher,
  Card,
  Error,
  SearchForm,
  Spinner,
} from '../../components';
import {LANGUAGE} from '../../constants';
import useAnimate from '../../helpers/animate';
import {colors} from '../../helpers/colors';
import fetchData from '../../services/api';
import {PageType} from '../../services/page';
import {SearchButtons} from '../../types/button';
import {MovieListItem} from '../../types/movie';
import {FetchListResponse} from '../../types/response';
import {TvShowShort} from '../../types/tvShowShort';

const buttons: SearchButtons[] = [
  {title: 'Фiльми', path: 'movie'},
  {title: 'Тв', path: 'tv'},
];

const SearchScreen = () => {
  const [text, setText] = useState<string>('');
  const [page, setPage] = useState<PageType>({movie: 1, tv: 1});
  const [activeButton, setActiveButton] = useState<'movie' | 'tv'>(
    buttons[0].path,
  );
  const ref = useRef<FlatList>(null);

  const [isQueried, setIsQueried] = useState(false);

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
    error: movieError,
    refetch: movieRefetch,
    isFetched,
  } = useQuery({
    queryKey: ['searchMovie', page[activeButton], activeButton],
    queryFn: () =>
      fetchData<FetchListResponse<MovieListItem[] | TvShowShort[]>>(
        `https://api.themoviedb.org/3/search/${activeButton}?query=${text}&language=${LANGUAGE}&page=${page[activeButton]}`,
      ),
    // enabled: true,
    enabled: isQueried,
  });
  const {fadeAnim} = useAnimate(movieData);

  const handleSearch = () => {
    setIsQueried(true);
    setPage({movie: 1, tv: 1});
    movieRefetch();
    Keyboard.dismiss();
    ref.current?.scrollToOffset({offset: 0, animated: true});
  };

  const nextPage = () => {
    setPage(prev => ({...prev, [activeButton]: prev[activeButton] + 1}));
    ref.current?.scrollToOffset({offset: 0, animated: true});
  };

  const prevPage = () => {
    setPage(prev => ({...prev, [activeButton]: prev[activeButton] - 1}));
    ref.current?.scrollToOffset({offset: 0, animated: true});
  };

  const handleChangeActiveButton = (str: 'movie' | 'tv' | string) => {
    setActiveButton(str as 'movie' | 'tv');
  };

  return (
    <View style={styles.container}>
      <SearchForm text={text} setText={setText} handleSearch={handleSearch} />
      <View style={styles.content}>
        <ButtonSwitcher
          buttons={buttons}
          title="Категорiя"
          active={activeButton}
          handleChangeActive={handleChangeActiveButton}
        />
        <Spinner isLoading={isMovieLoading} />
        <Error isError={isMovieError} error={movieError} />
        {isFetched && movieData && movieData.results.length === 0 && (
          <Text style={styles.text}>Нiчогог не знайдено</Text>
        )}
        <Animated.View style={{opacity: fadeAnim}}>
          <FlatList
            ref={ref}
            data={[...(movieData?.results ?? []), 'button']}
            renderItem={({item}) => {
              if (typeof item !== 'string') {
                return <Card item={item} />;
              } else {
                return (
                  (movieData?.results &&
                    movieData.page < movieData.total_pages && (
                      <View style={styles.button__wrapper}>
                        {page[activeButton] > 1 && (
                          <TouchableOpacity
                            style={styles.button__navigation}
                            onPress={prevPage}>
                            <Text style={styles.button__text}>
                              Попередня стр
                            </Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={styles.button__navigation}
                          onPress={nextPage}>
                          <Text style={styles.button__text}>Наступна стр</Text>
                        </TouchableOpacity>
                      </View>
                    )) || <></>
                );
              }
            }}
            keyExtractor={item => uuid.v4().toString()}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  safe__area: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.gray,
    borderRadius: 20,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 14,
    color: colors.textBlack,
  },
  close__icon: {
    width: 15,
    height: 15,
    color: colors.black,
    marginRight: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  button__text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 210,
    marginTop: 15,
  },
  button__wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button__navigation: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.textBlack,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
