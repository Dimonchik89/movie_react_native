import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../helpers/colors';
import {ButtonType} from '../../../types/button';
import ButtonSwitcherItem from '../ButtonSwitcherItem/ButtonSwitcherItem';

interface Props {
  buttons: ButtonType[];
  title: string;
  active: string;
  handleChangeActive: (str: string) => void;
}

const ButtonSwitcher: React.FC<Props> = ({
  buttons,
  title,
  active,
  handleChangeActive,
}) => {
  const handleChangeActiveButton = (title: string) => {
    handleChangeActive(title);
  };

  const content = buttons.map(item => (
    <ButtonSwitcherItem
      key={item.title}
      title={item.title}
      path={item.path}
      activeButton={active}
      handleChangeActiveButton={handleChangeActiveButton}
    />
  ));

  return (
    <View style={styles.switcherWrapper}>
      <Text style={styles.switcherTitle}>{title}</Text>
      <LinearGradient
        colors={['#1ed5a9', '#01b4e4']}
        style={styles.buttonWrapper}>
        {content}
      </LinearGradient>
    </View>
  );
};

export default ButtonSwitcher;

const styles = StyleSheet.create({
  switcherWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  switcherTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textBlack,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginLeft: 15,
    borderColor: colors.darkBlue,
    borderWidth: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
});
