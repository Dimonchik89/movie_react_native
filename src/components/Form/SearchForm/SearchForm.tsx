import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CloseIcon from '../../../assets/svg/Close';
import {colors} from '../../../helpers/colors';

interface Props {
  text: string;
  setText: (data: string) => void;
  handleSearch: () => void;
}

const SearchForm: React.FC<Props> = ({text, setText, handleSearch}) => {
  return (
    <SafeAreaView style={styles.safe__area}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Пошук..."
        placeholderTextColor={colors.gray}
      />
      {text && (
        <CloseIcon style={styles.close__icon} onPress={() => setText('')} />
      )}
      <TouchableOpacity activeOpacity={0.5} onPress={handleSearch}>
        <LinearGradient colors={['#1ed5a9', '#01b4e4']} style={styles.button}>
          <Text style={styles.button__text}>Пошук</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  safe__area: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.gray,
    borderRadius: 20,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 10,
    fontSize: 14,
    color: colors.textBlack,
  },
  close__icon: {
    width: 15,
    height: 15,
    color: colors.black,
    marginRight: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  button__text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
