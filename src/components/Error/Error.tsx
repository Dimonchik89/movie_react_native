import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../helpers/colors';
import {RootStackParamList} from '../../types/screen';

interface Props {
  isError: boolean;
  error: Error | null;
}

const Error: React.FC<Props> = ({isError, error}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View>
      {isError && (
        <View>
          <Text style={styles.textBlack}>{error?.message}</Text>
          <Button title="Назад" onPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  root: {
    marginTop: 30,
  },
  textBlack: {
    fontSize: 20,
    color: colors.textBlack,
    textAlign: 'center',
    paddingTop: 10,
  },
});
