import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {colors} from '../../helpers/colors';

interface Props {
  rating: number;
  ratingStyle?: any;
}

const Rating: React.FC<Props> = ({rating, ratingStyle}) => {
  let normalizeRating = rating * 10;
  normalizeRating = +normalizeRating.toFixed(0);

  const radius = 18;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const strokeDashoffset =
    circumference - (circumference * normalizeRating) / 100;

  let currentColor;

  if (normalizeRating > 70) {
    currentColor = colors.green;
  } else if (normalizeRating > 40) {
    currentColor = colors.yellow;
  } else {
    currentColor = colors.lightRed;
  }

  return (
    <View style={ratingStyle || styles.root}>
      <View style={styles.rating}>
        <Svg
          height={halfCircle * 2}
          width={halfCircle * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <Circle
            stroke={colors.darkBlue}
            fill="none"
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={currentColor}
            fill="none"
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${halfCircle}, ${halfCircle}`}
          />
        </Svg>
        <View style={styles.ratingResutl}>
          <Text style={styles.ratingText}>{normalizeRating}%</Text>
        </View>
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    zIndex: 20,
    transform: [{translateY: 20}],
  },
  rating: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ratingResutl: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: [{translateX: -11}, {translateY: -10}],
  },
  ratingText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
