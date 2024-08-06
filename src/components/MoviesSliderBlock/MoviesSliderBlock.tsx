import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonSwitcher, Error, Slider, Spinner} from '..';
import {colors} from '../../helpers/colors';
import {ButtonType} from '../../types/button';
import {MovieTrending} from '../../types/movie';
import {TvShowShort} from '../../types/tvShowShort';

interface Props {
  buttons: ButtonType[];
  active: string;
  handleChangeActive: (str: string) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  movies: MovieTrending[] | TvShowShort[];
  title: string;
}

const MoviesSliderBlock: React.FC<Props> = ({
  buttons,
  active,
  handleChangeActive,
  isLoading,
  isError,
  error,
  movies,
  title,
}) => {
  return (
    <View style={styles.root}>
      <ButtonSwitcher
        buttons={buttons}
        title={title}
        active={active}
        handleChangeActive={handleChangeActive}
      />
      <Spinner isLoading={isLoading} />
      <Error isError={isError} error={error} />
      <Slider movies={movies} />
    </View>
  );
};

export default MoviesSliderBlock;

const styles = StyleSheet.create({
  root: {
    marginBottom: 25,
  },
  textBlack: {
    color: colors.textBlack,
    textAlign: 'center',
  },
});
