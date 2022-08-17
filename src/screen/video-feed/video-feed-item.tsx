import React, {useState} from 'react';
import {
  ViewProps,
  TextProps,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import {height, width} from '../../theme/size';
export default function VideoFeedItem({item}: {item: any}) {
  const [pause, setPause] = useState(false);
  console.log('pause', pause);
  return (
    <TouchableWithoutFeedback
      //   style={{height: 300, width: 300, borderWidth: 1}}
      onPress={() => {
        setPause(!pause);
      }}>
      <Video
        // controls
        paused={pause}
        //   repeat
        resizeMode="cover"
        source={{uri: item?.url}}
        style={{
          height: height,
          width: width,
        }}
      />
    </TouchableWithoutFeedback>
  );
}
