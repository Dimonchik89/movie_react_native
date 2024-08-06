import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Animated, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Card, Error} from '../../components';
import {LANGUAGE} from '../../constants';
import useAnimate from '../../helpers/animate';
import {colors} from '../../helpers/colors';
import fetchData from '../../services/api';
import {MovieListItem} from '../../types/movie';
import {FetchListResponse} from '../../types/response';
import {RootStackParamsTabsList} from '../../types/tabs';

type MoviesScreenProps = NativeStackScreenProps<
  RootStackParamsTabsList,
  'MoviesScreen'
>;

const MoviesScreen: React.FC<MoviesScreenProps> = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const {fadeAnim} = useAnimate(null);

  const {data, isError, isLoading, error, refetch} = useQuery({
    queryKey: ['movies', currentPage],
    queryFn: () =>
      fetchData<FetchListResponse<MovieListItem[]>>(
        `https://api.themoviedb.org/3/movie/now_playing?language=${LANGUAGE}&page=${currentPage}`,
      ),
    enabled: true,
  });

  useEffect(() => {
    setMovies(prev => [...prev, ...(data?.results ?? [])]);
  }, [data]);

  const handleChangeCurrentPage = () => {
    if (currentPage < data?.total_pages!) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const refreshData = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(1);
    setMovies([]);
    refetch();
  };

  const content = movies.map(item => <Card key={item.id} item={item} />);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Фiльми</Text>
      <Animated.View style={[styles.wrapper, {opacity: fadeAnim}]}>
        <Error isError={isError} error={error} />
        <FlatList
          onRefresh={refreshData}
          refreshing={isLoading}
          data={[...movies, 'button']}
          renderItem={({item}) => {
            if (typeof item !== 'string') {
              return <Card key={item.id} item={item} />;
            } else {
              return (
                <View // прятать кнопку при первой загрузке пока нет данных, и на странице тв тоже
                  style={currentPage === data?.total_pages && styles.hidden}>
                  <Button
                    title="Бiльше"
                    onPress={handleChangeCurrentPage}
                    disabled={isLoading}
                  />
                </View>
              );
            }
          }}
          keyExtractor={(item, i) => i.toString()}
        />
      </Animated.View>
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    color: colors.textBlack,
    fontWeight: 'bold',
  },
  wrapper: {
    gap: 15,
    marginBottom: 90,
  },
  bottomEl: {
    paddingVertical: 1,
  },
  hidden: {
    display: 'none',
  },
});
