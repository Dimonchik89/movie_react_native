import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Error, NavigationStackHeader, Spinner} from '../../components';
import {
  InfoActors,
  InfoDescription,
  InfoPoster,
  InfoRecommendation,
} from '../../components/Info';
import {LANGUAGE} from '../../constants';
import fetchData from '../../services/api';
import {Movie, MovieRecommendation} from '../../types/movie';
import {FetchListResponse, ResponseActor} from '../../types/response';
import {RootStackParamList} from '../../types/screen';
import {TvShow, TvShowRecommendation} from '../../types/tvShowShort';

interface InfoScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'InfoScreen'> {}

const InfoScreen: React.FC<InfoScreenProps> = ({navigation, route}) => {
  const {id, media_type} = route.params;

  const {data, isError, error, isLoading} = useQuery<Movie | TvShow>({
    queryKey: [media_type, id],
    queryFn: () =>
      fetchData(
        `https://api.themoviedb.org/3/${media_type}/${id}?language=${LANGUAGE}`,
      ),
  });

  const {
    data: actors,
    isLoading: isActorsLoading,
    isError: isActorsError,
    error: actorsError,
  } = useQuery<ResponseActor>({
    queryKey: ['actors', id],
    queryFn: () =>
      fetchData(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?language=${LANGUAGE}`,
      ),
  });

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
    error: recommendationsError,
  } = useQuery<
    FetchListResponse<TvShowRecommendation[] | MovieRecommendation[]>
  >({
    queryKey: ['recommendations', id],
    queryFn: () =>
      fetchData(
        `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?language=${LANGUAGE}`,
      ),
  });

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (isError) {
    return <Error isError={isError} error={error} />;
  }

  return (
    <ScrollView>
      <NavigationStackHeader />
      <Spinner isLoading={isLoading} />
      <Error isError={isError} error={error} />
      <InfoPoster
        backdrop_path={data?.backdrop_path || ''}
        poster_path={data?.poster_path || ''}
      />
      <InfoDescription data={data!} />
      <View style={styles.wrapper}>
        <Spinner isLoading={isActorsLoading} />
        <Error isError={isActorsError} error={actorsError} />
        <InfoActors actors={actors?.cast} />
      </View>

      <View style={styles.wrapper}>
        <Spinner isLoading={isRecommendationsLoading} />
        <Error isError={isRecommendationsError} error={recommendationsError} />
        {recommendations && (
          <InfoRecommendation data={recommendations?.results} />
        )}
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
