import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../helpers/colors';

interface Props {
  backdrop_path: string;
  poster_path: string;
}

const InfoPoster: React.FC<Props> = ({backdrop_path, poster_path}) => {
  return (
    <View style={styles.backdropWrapper}>
      <View style={styles.backdropOverlay}></View>
      <Image
        style={styles.backdropImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
        }}
      />
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
        }}
      />
    </View>
  );
};

export default InfoPoster;

const styles = StyleSheet.create({
  backdropWrapper: {
    position: 'relative',
  },
  backdropOverlay: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: 300,
    backgroundColor: colors.black,
    opacity: 0.4,
  },
  backdropImage: {
    height: 300,
  },
  poster: {
    position: 'absolute',
    top: '50%',
    left: 15,
    zIndex: 2,
    width: 120,
    height: 200,
    transform: [{translateY: -100}],
    borderRadius: 10,
  },
});
