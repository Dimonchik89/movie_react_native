import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {isMovie, isTvShow} from '../../../helpers/checkType';
import {colors} from '../../../helpers/colors';
import {Movie} from '../../../types/movie';
import {TvShow} from '../../../types/tvShowShort';
import Rating from '../../Rating/Rating';

interface Props {
  data: Movie | TvShow;
}

const InfoDescription: React.FC<Props> = ({data}) => {
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#1f0a0a', '#1f0a0ad6']}>
      <View style={styles.descriptionHeader}>
        <Text style={styles.title}>
          {isMovie(data) && <Text>{(data as Movie).title}</Text>}
          {isTvShow(data) && <Text>{(data as TvShow).name}</Text>}
        </Text>
        <Text style={styles.buttonText}>
          {isMovie(data) && (
            <Text>({(data as Movie).release_date.split('-')[0]})</Text>
          )}
          {isTvShow(data) && (
            <Text>({(data as TvShow).first_air_date.split('-')[0]})</Text>
          )}
        </Text>
      </View>

      <View style={styles.about}>
        <Rating rating={data?.vote_average || 0} ratingStyle={styles.rating} />

        <View style={styles.aboutDescription}>
          {isMovie(data) && (
            <Text style={styles.text}>
              {(data as Movie).release_date.replaceAll('-', '/')}
            </Text>
          )}

          {isTvShow(data) && (
            <Text style={styles.text}>
              {(data as TvShow).first_air_date.replaceAll('-', '/')}
            </Text>
          )}

          {isMovie(data) && (
            <View style={styles.genres}>
              {(data as Movie).genres.map(item => (
                <Text style={styles.text} key={data?.id + item.name}>
                  {item.name}
                </Text>
              ))}
            </View>
          )}

          {isTvShow(data) && (
            <View style={styles.genres}>
              {(data as Movie).genres.map(item => (
                <Text style={styles.text} key={data?.id + item.name}>
                  {item.name}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>

      {data?.overview && (
        <View style={styles.overview}>
          <Text style={styles.subtitle}>Опис:</Text>
          <Text style={styles.text}>{data?.overview}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default InfoDescription;

const styles = StyleSheet.create({
  linearGradient: {
    paddingBottom: 15,
    paddingHorizontal: 30,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 5,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'regular',
    letterSpacing: 0.1,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: colors.white,
    backgroundColor: 'transparent',
  },
  about: {
    marginTop: 10,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  aboutDescription: {
    flex: 1,
    alignItems: 'center',
  },
  overview: {
    marginTop: 20,
  },
  rating: {
    position: 'static',
  },
  genres: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  relative: {
    position: 'relative',
  },
});
