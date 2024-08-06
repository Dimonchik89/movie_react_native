import React from 'react';
import {ActivityIndicator, View} from 'react-native';

interface Props {
  isLoading: boolean;
}

const Spinner: React.FC<Props> = ({isLoading}) => {
  return (
    <View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default Spinner;
