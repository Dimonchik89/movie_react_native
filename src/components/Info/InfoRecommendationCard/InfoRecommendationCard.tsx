import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  isMovieRecommendation,
  isTvShowRecommendation,
} from '../../../helpers/checkType';
import {colors} from '../../../helpers/colors';
import {normalizeText} from '../../../services/string';
import {MovieRecommendation} from '../../../types/movie';
import {RootStackParamList} from '../../../types/screen';
import {TvShowRecommendation} from '../../../types/tvShowShort';

interface Props {
  item: TvShowRecommendation | MovieRecommendation;
}

const InfoRecommendationCard: React.FC<Props> = ({item}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.5}
      onPress={() =>
        navigation.push('InfoScreen', {
          id: item.id,
          media_type: item.media_type,
        })
      }>
      <View style={styles.wrapper}>
        <Image
          style={{width: 300, height: 200}}
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
          alt={item.id.toString()}
        />
        <View style={styles.description}>
          <Text style={styles.text}>
            {isTvShowRecommendation(item) &&
              normalizeText((item as TvShowRecommendation).name, 20)}
            {isMovieRecommendation(item) &&
              normalizeText((item as MovieRecommendation).title, 20)}
          </Text>
          <Text style={styles.text}>
            {(item.vote_average * 10).toFixed(0)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InfoRecommendationCard;

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 9,
  },
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  description: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textBlack,
  },
  image: {
    width: 300,
    height: 200,
  },
});
