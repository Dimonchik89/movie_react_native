import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {isMovieListItem, isTvShowShort} from '../../helpers/checkType';
import {colors} from '../../helpers/colors';
import {normalizeDate} from '../../services/string';
import {MovieListItem} from '../../types/movie';
import {RootStackParamList} from '../../types/screen';
import {TvShowShort} from '../../types/tvShowShort';

interface Props {
  item: MovieListItem | TvShowShort;
}

const Card: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('InfoScreen', {
          id: item.id,
          media_type: isMovieListItem(item as MovieListItem) ? 'movie' : 'tv',
        });
      }}>
      {(item as MovieListItem)?.poster_path ? (
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              (item as MovieListItem | TvShowShort)?.poster_path
            }`,
          }}
        />
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: `https://cringemdb.com/img/movie-poster-placeholder.png`,
          }}
        />
      )}

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text
            style={styles.movieTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {isMovieListItem(item) && (item as MovieListItem).title}
            {isTvShowShort(item) && (item as TvShowShort).name}
          </Text>

          {
            <Text style={styles.movieDate}>
              {isMovieListItem(item) &&
                normalizeDate((item as MovieListItem).release_date ?? '')}
              {isTvShowShort(item) &&
                normalizeDate((item as TvShowShort).first_air_date ?? '')}
            </Text>
          }
        </View>
        <View>
          <Text
            style={styles.movieDescription}
            numberOfLines={2}
            ellipsizeMode="tail">
            {(item as MovieListItem | TvShowShort)?.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 150,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  contentHeader: {
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 18,
    color: colors.textBlack,
    fontWeight: 'bold',
    // flex: 1,
  },
  movieDate: {
    fontSize: 15,
    color: colors.gray,
  },
  movieDescription: {
    // maxWidth: 250,
    fontSize: 14,
    color: colors.textBlack,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    flexGrow: 0,
  },
});
