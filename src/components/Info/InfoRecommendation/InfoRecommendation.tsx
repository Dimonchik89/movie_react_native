import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {InfoRecommendationCard} from '..';
import {colors} from '../../../helpers/colors';
import {MovieRecommendation} from '../../../types/movie';
import {TvShowRecommendation} from '../../../types/tvShowShort';

type Recomendation = TvShowRecommendation | MovieRecommendation;

interface Props {
  data: Recomendation[] | undefined;
}

const InfoRecommendation: React.FC<Props> = ({data = []}) => {
  return (
    <View>
      <Text style={styles.title}>Рекомендацiї</Text>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({item}) => <InfoRecommendationCard item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default InfoRecommendation;

const styles = StyleSheet.create({
  title: {
    color: colors.textBlack,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    marginBottom: 10,
  },
});
