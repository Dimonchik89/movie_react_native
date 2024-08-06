import React from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';
import useAnimate from '../../helpers/animate';
import {MovieTrending} from '../../types/movie';
import {TvShowShort} from '../../types/tvShowShort';
import CardHome from '../CardHome';

interface Props {
  movies: MovieTrending[] | TvShowShort[];
}

const Slider: React.FC<Props> = ({movies}) => {
  const {fadeAnim} = useAnimate(movies);

  const content = movies?.map(item => <CardHome key={item.id} item={item} />);

  return (
    <Animated.View style={[{opacity: fadeAnim}]}>
      <ScrollView style={styles.scroll} horizontal={true}>
        {content}
      </ScrollView>
    </Animated.View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  scroll: {
    gap: 5,
    minHeight: 280,
  },
  cart: {
    marginHorizontal: 5,
  },
});
