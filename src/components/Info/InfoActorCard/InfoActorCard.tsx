import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../helpers/colors';
import {Actor} from '../../../types/actor';
import {RootStackParamList} from '../../../types/screen';

interface Props {
  actor: Actor;
}

const InfoActorCard: React.FC<Props> = ({actor}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={[styles.root, styles.shadowProp]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('PersonScreen', {id: actor.id})}>
      {actor.profile_path ? (
        <Image
          style={styles.photo}
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.photo}
          src={
            'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'
          }
          alt={actor.name}
        />
      )}

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{actor.name}</Text>
        <Text style={styles.actorText}>{actor.character}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default InfoActorCard;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    width: 140,
  },
  shadowProp: {
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: colors.gray,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  photo: {
    width: '100%',
    height: 150,
  },
  contentWrapper: {
    padding: 10,
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: colors.textBlack,
  },
  actorText: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.textBlack,
  },
});
