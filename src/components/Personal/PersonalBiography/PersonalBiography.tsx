import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../helpers/colors';

interface Props {
  biography: string | undefined;
}

const PersonalBiography: React.FC<Props> = ({biography}) => {
  return (
    <>
      {biography ? (
        <View style={styles.root}>
          <Text style={styles.title}>Бiографiя</Text>
          <View style={styles.text__wrapper}>
            <Text style={styles.text}>{biography}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default PersonalBiography;

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textBlack,
  },
  text__wrapper: {
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: colors.textBlack,
  },
});
