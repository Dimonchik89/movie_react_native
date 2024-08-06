import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {isMovieTrending, isTvShowShort} from '../../helpers/checkType';
import {colors} from '../../helpers/colors';
import {normalizeDate, normalizeText} from '../../services/string';
import {MovieTrending} from '../../types/movie';
import {RootStackParamList} from '../../types/screen';
import {TvShowShort} from '../../types/tvShowShort';
import Rating from '../Rating/Rating';

interface Props {
  item: MovieTrending | TvShowShort;
}

const CardHome: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('InfoScreen', {
          id: item.id,
          media_type: isMovieTrending(item) ? 'movie' : 'tv',
        })
      }>
      <View style={styles.cart}>
        <View style={styles.contentWrapper}>
          {item.poster_path ? (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: `https://cringemdb.com/img/movie-poster-placeholder.png`,
              }}
            />
          )}

          <Rating rating={item.vote_average} />
        </View>
        <View>
          {isMovieTrending(item) && (
            <Text style={styles.title}>
              {normalizeText((item as MovieTrending).title, 18)}
            </Text>
          )}
        </View>
        <View>
          {isMovieTrending(item) && (
            <Text style={styles.textDate}>
              {normalizeDate((item as MovieTrending).release_date)}
            </Text>
          )}
        </View>
        <View>
          {isTvShowShort(item) && (
            <Text style={styles.title}>
              {normalizeText((item as TvShowShort).name, 18)}
            </Text>
          )}
        </View>
        <View>
          {isTvShowShort(item) && (
            <Text style={styles.textDate}>
              {normalizeDate((item as TvShowShort).first_air_date)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardHome;

const styles = StyleSheet.create({
  cart: {
    marginHorizontal: 5,
    overflow: 'hidden',
    borderRadius: 10,
  },
  contentWrapper: {
    position: 'relative',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: colors.textBlack,
    fontWeight: 'bold',
  },
  textDate: {
    fontSize: 13,
    color: colors.gray,
  },
  ratingStyle: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    zIndex: 20,
    transform: [{translateY: 20}],
  },
});
