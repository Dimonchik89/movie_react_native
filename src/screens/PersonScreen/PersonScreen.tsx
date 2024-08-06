import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQueries} from '@tanstack/react-query';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Error,
  NavigationStackHeader,
  PersonalInfo,
  SocialActor,
  Spinner,
} from '../../components';
import PersonalBiography from '../../components/Personal/PersonalBiography/PersonalBiography';
import {LANGUAGE} from '../../constants';
import {colors} from '../../helpers/colors';
import fetchData from '../../services/api';
import {ActorExternal, ActorInfo} from '../../types/actor';
import {RootStackParamList} from '../../types/screen';

interface PersonScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'PersonScreen'> {}

const PersonScreen: React.FC<PersonScreenProps> = ({navigation, route}) => {
  const {id} = route.params;
  const {
    '0': {data, isLoading, isError, error},
    '1': {
      data: externalData,
      isLoading: isLoadingExternal,
      isError: isErrorExternal,
      error: errorExternal,
    },
  } = useQueries({
    queries: [
      {
        queryKey: ['persone', id],
        queryFn: () =>
          fetchData<ActorInfo>(
            `https://api.themoviedb.org/3/person/${id}?language=${LANGUAGE}`,
          ),
      },
      {
        queryKey: ['external', id],
        queryFn: () =>
          fetchData<ActorExternal>(
            `https://api.themoviedb.org/3/person/${id}/external_ids?language=${LANGUAGE}`,
          ),
      },
    ],
  });

  return (
    <ScrollView style={styles.root}>
      <NavigationStackHeader />
      <Spinner isLoading={isLoading} />
      <Error isError={isError} error={error} />
      <View>
        <View style={styles.image__wrapper}>
          {data?.profile_path ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data?.profile_path}`,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg',
              }}
            />
          )}
        </View>
        <View>
          <Text style={styles.title}>{data?.name}</Text>
        </View>
        <SocialActor data={externalData!} />
        <PersonalInfo data={data!} />
        <PersonalBiography biography={data?.biography} />
      </View>
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  image__wrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 28,
    color: colors.textBlack,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
