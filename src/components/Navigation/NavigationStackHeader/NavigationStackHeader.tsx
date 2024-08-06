import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import HomeIcon from '../../../assets/svg/HomeIcon';
import LeftArrowIcon from '../../../assets/svg/LeftArrowIcon';
import {RootStackParamList} from '../../../types/screen';

const NavigationStackHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navigationWrapper}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <LeftArrowIcon style={styles.icon} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('TabScreen')}>
        <HomeIcon style={styles.icon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NavigationStackHeader;

const styles = StyleSheet.create({
  navigationWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
