import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../helpers/colors';

interface Props {
  title: string;
  path: string;
  activeButton: string;
  handleChangeActiveButton: (str: string) => void;
}

const ButtonSwitcherItem: React.FC<Props> = ({
  title,
  path,
  activeButton,
  handleChangeActiveButton,
}) => {
  const handleChange = () => {
    handleChangeActiveButton(path);
  };

  const rootStyle =
    path === activeButton
      ? {...styles.button, ...styles.buttonActive}
      : styles.button;

  const textStyle =
    path === activeButton
      ? {...styles.buttonText, ...styles.buttonTextActive}
      : styles.buttonText;

  return (
    <TouchableOpacity style={rootStyle} onPress={handleChange}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSwitcherItem;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
  },
  buttonActive: {
    backgroundColor: colors.darkBlue,
    color: colors.white,
  },
  buttonText: {
    color: colors.darkBlue,
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'regular',
  },
  buttonTextActive: {
    color: colors.white,
  },
});
