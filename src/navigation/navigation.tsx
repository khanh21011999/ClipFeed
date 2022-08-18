/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ViewProps,
  TextProps,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VideoFeed from '../screen/video-feed/video-feed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import Octicon from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused, size, colour}) => {
          if (route.name === 'Discover') {
            if (focused) {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons
                    name="compass-outline"
                    size={RFValue(24)}
                    color="#F80C77"
                  />
                  <Text
                    style={{
                      fontSize: RFValue(10),
                      color: '#F80C77',
                      fontWeight: '600',
                    }}>
                    Discover
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons
                    name="compass-outline"
                    size={RFValue(24)}
                    color="white"
                  />
                  <Text style={{fontSize: RFValue(10), color: 'white'}}>
                    Discover
                  </Text>
                </View>
              );
            }
          }
          if (route.name === 'Star') {
            if (focused) {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="star" size={RFValue(24)} color="#F80C77" />
                  <Text style={{fontSize: RFValue(10), color: '#F80C77'}}>
                    Star
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name="star" size={RFValue(24)} color="white" />
                  <Text style={{fontSize: RFValue(10), color: 'white'}}>
                    Star
                  </Text>
                </View>
              );
            }
          }
          if (route.name === 'Add') {
            if (focused) {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Octicon
                    name="diff-added"
                    size={RFValue(24)}
                    color="#F80C77"
                  />
                  <Text style={{fontSize: RFValue(10), color: '#F80C77'}}>
                    Add
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Octicon name="diff-added" size={RFValue(24)} color="white" />
                  <Text style={{fontSize: RFValue(10), color: 'white'}}>
                    Add
                  </Text>
                </View>
              );
            }
          }
          if (route.name === 'Cart') {
            if (focused) {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons
                    name="cart-outline"
                    size={RFValue(24)}
                    color="#F80C77"
                  />
                  <Text style={{fontSize: RFValue(10), color: '#F80C77'}}>
                    Cart
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons
                    name="cart-outline"
                    size={RFValue(24)}
                    color="white"
                  />
                  <Text style={{fontSize: RFValue(10), color: 'white'}}>
                    Cart
                  </Text>
                </View>
              );
            }
          }
          if (route.name === 'Profile') {
            if (focused) {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <FontAwesome name="user" size={RFValue(24)} color="#F80C77" />
                  <Text style={{fontSize: RFValue(10), color: '#F80C77'}}>
                    Profile
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <FontAwesome name="user" size={RFValue(24)} color="white" />
                  <Text style={{fontSize: RFValue(10), color: 'white'}}>
                    Profile
                  </Text>
                </View>
              );
            }
          }
        },
      })}>
      <Tab.Screen name="Discover" component={VideoFeed} />
      <Tab.Screen name="Star" component={VideoFeed} />
      <Tab.Screen name="Add" component={VideoFeed} />
      <Tab.Screen name="Cart" component={VideoFeed} />

      <Tab.Screen name="Profile" component={VideoFeed} />
    </Tab.Navigator>
  );
};
export default function NavigationScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="homeFeed"
        component={BottomTab}
      />
    </Stack.Navigator>
  );
}
