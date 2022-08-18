/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import VideoFeed from './src/screen/video-feed/video-feed';
import {NavigationContainer} from '@react-navigation/native';
import NavigationScreen from './src/navigation/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <NavigationScreen />
      </View>
    </NavigationContainer>
  );
};
export default App;
