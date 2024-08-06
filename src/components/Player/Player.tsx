import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

const Player = () => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
        </style>
      </head>
      <body>
        <iframe src="https://vidsrc.xyz/embed/movie?imdb=tt5433140" allowfullscreen width={640} height={480}></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{
          html: htmlContent,
        }}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1200,
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});
