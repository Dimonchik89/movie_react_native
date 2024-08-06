import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Animated, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Card, Error} from '../../components';
import {LANGUAGE} from '../../constants';
import useAnimate from '../../helpers/animate';
import {colors} from '../../helpers/colors';
import fetchData from '../../services/api';
import {FetchListResponse} from '../../types/response';
import {TvShowShort} from '../../types/tvShowShort';

const TvScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [shows, setShows] = useState<TvShowShort[]>([]);
  const {fadeAnim} = useAnimate(null);

  const {data, isError, error, isLoading, refetch} = useQuery<
    FetchListResponse<TvShowShort[]>
  >({
    queryKey: ['tvShow', currentPage],
    queryFn: () =>
      fetchData(
        `https://api.themoviedb.org/3/tv/on_the_air?language=${LANGUAGE}&page=${currentPage}`,
      ),
  });

  useEffect(() => {
    setShows(prev => [...prev, ...(data?.results! ?? [])]);
  }, [data]);

  const handleChangeCurrentPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const refreshData = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(1);
    setShows([]);
    refetch();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Тв шоу</Text>
      <Animated.View style={[styles.wrapper, {opacity: fadeAnim}]}>
        <Error isError={isError} error={error} />
        <FlatList
          onRefresh={refreshData}
          refreshing={isLoading}
          data={[...shows, 'button']}
          renderItem={({item}) => {
            if (typeof item !== 'string') {
              return <Card key={item.id} item={item} />;
            } else {
              return (
                <View
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

export default TvScreen;

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
