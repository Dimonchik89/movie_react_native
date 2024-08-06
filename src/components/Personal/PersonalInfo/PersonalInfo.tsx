import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../helpers/colors';
import {normalizeDate} from '../../../services/string';
import {ActorInfo} from '../../../types/actor';

interface Props {
  data: ActorInfo;
}

const PersonalInfo: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Загальна iнформацiя</Text>
      <View style={styles.content}>
        {data?.known_for_department ? (
          <View style={styles.inner}>
            <Text style={styles.subtitle}>Відомий за</Text>
            <Text style={styles.text}>{data?.known_for_department}</Text>
          </View>
        ) : (
          <></>
        )}
        {data?.gender ? (
          <View style={styles.inner}>
            <Text style={styles.subtitle}>Стать</Text>
            <Text style={styles.text}>
              {data?.gender === 1 ? 'Female' : 'Male'}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {data?.birthday ? (
          <View style={styles.inner}>
            <Text style={styles.subtitle}>День народження</Text>
            <Text style={styles.text}>{normalizeDate(data?.birthday)}</Text>
          </View>
        ) : (
          <></>
        )}
        {data?.place_of_birth ? (
          <View style={styles.inner}>
            <Text style={styles.subtitle}>Місце народження</Text>
            <Text style={styles.text}>{data?.place_of_birth}</Text>
          </View>
        ) : (
          <></>
        )}
        {data?.deathday ? (
          <View style={styles.inner}>
            <Text style={styles.subtitle}>День смерті</Text>
            <Text style={styles.text}>{data?.deathday}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  root: {
    marginTop: 50,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  inner: {
    alignSelf: 'flex-start',
    width: '30%',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textBlack,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: colors.textBlack,
    // textTransform: 'capitalize',
  },
});
