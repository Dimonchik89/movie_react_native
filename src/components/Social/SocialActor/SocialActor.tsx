import React from 'react';
import {Alert, Linking, StyleSheet, View} from 'react-native';
import FacebookIcon from '../../../assets/svg/FacebookIcon';
import InstagramIcon from '../../../assets/svg/InstagramIcon';
import TiktokIcon from '../../../assets/svg/Tiktok';
import TwitterIcon from '../../../assets/svg/TwitterIcon';
import YoutubeIcon from '../../../assets/svg/YoutubeIcon';
import {colors} from '../../../helpers/colors';
import {ActorExternal} from '../../../types/actor';

interface Props {
  data: ActorExternal;
}

const SocialActor: React.FC<Props> = ({data}) => {
  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.root}>
      {data?.facebook_id && (
        <FacebookIcon
          style={styles.icon}
          onPress={() =>
            handlePress(`https://www.facebook.com/${data?.facebook_id}`)
          }
        />
      )}
      {data?.twitter_id && (
        <TwitterIcon
          style={styles.icon}
          onPress={() => handlePress(`https://x.com/${data?.twitter_id}`)}
        />
      )}
      {data?.instagram_id && (
        <InstagramIcon
          style={styles.icon}
          onPress={() =>
            handlePress(`https://www.instagram.com/${data?.instagram_id}/`)
          }
        />
      )}
      {data?.tiktok_id && (
        <TiktokIcon
          style={styles.icon}
          onPress={() =>
            handlePress(`https://www.tiktok.com/@${data?.tiktok_id}`)
          }
        />
      )}
      {data?.youtube_id && (
        <YoutubeIcon
          style={styles.icon}
          onPress={() =>
            handlePress(`https://www.youtube.com/${data?.youtube_id}`)
          }
        />
      )}
    </View>
  );
};

export default SocialActor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
    color: colors.black,
  },
});
