import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {InfoActorCard} from '..';
import {colors} from '../../../helpers/colors';
import {Actor} from '../../../types/actor';

interface Props {
  actors: Actor[] | undefined;
}

const InfoActors: React.FC<Props> = ({actors = []}) => {
  const actorList = actors?.length > 10 ? actors?.slice(0, 11) : actors;

  return (
    <View>
      <Text style={styles.title}>Актори</Text>
      <FlatList
        horizontal={true}
        data={actorList}
        renderItem={({item}) => <InfoActorCard actor={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default InfoActors;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 110,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textBlack,
    marginLeft: 15,
  },
});
