/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  ViewProps,
  TextProps,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import {apiUrl} from '../../constant/string';

import Video from 'react-native-video';
import {height, width} from '../../theme/size';
import VideoFeedItem from './video-feed-item';
const CONTAINER: ViewStyle = {
  flex: 1,
  //   minHeight: height,
  //   width: width,
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    bg: 'green',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    bg: 'red',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    bg: 'blue',
  },
];

export default function VideoFeed() {
  const [videoData, setVideoData] = useState<any>([]);
  const [pause, setPause] = useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState<any>(0);
  const videoRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState<any>(false);
  const handleLoadMore = () => {
    setShowLoadingIndicator(true);
    getVideoData(currentPage + 1, perPage).then(() => {
      setCurrentPage(currentPage + 1);
    });
  };

  useEffect(() => {
    getVideoData(currentPage, perPage);
  }, []);

  const getVideoData = async (currPage, perP) => {
    axios.get(apiUrl(currPage, perP)).then((data: any) => {
      data?.data?.data.forEach((item: any, index: any) => {
        item.isPause = true;
      });

      const newData = [...videoData, ...data?.data?.data];
      console.log('new', newData);

      setVideoData(newData);
      setShowLoadingIndicator(false);
    });
  };
  const handleScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = Math.round(e.nativeEvent.contentOffset.y / height);
      setFocusedIndex(offset);
    },
    [setFocusedIndex],
  );
  // if pause && focus ==> focus , if not pause
  const renderItem = ({item, index}: {item: any; index: any}) => {
    // console.log('index', index);
    const setPauseValue = () => {
      if (index === focusedIndex && item?.isPause === true) {
        return false;
      } else if (item?.isPause === false && index === focusedIndex) {
        return true;
      } else if (index !== focusedIndex) {
        return true;
      }
    };

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const newData = videoData.map((itemList: any, indexList) => {
            if (itemList?.order_id === item.order_id) {
              return {
                ...itemList,
                isPause: !itemList.isPause,
              };
            }
            return itemList;
          });
          console.log('new data', newData);
          setVideoData(newData);
        }}>
        <View
          style={{
            height: height,
            width: width,
          }}>
          <Video
            // controls

            paused={setPauseValue()}
            repeat
            resizeMode="cover"
            source={{uri: item?.url}}
            style={{
              //   position: 'absolute',
              // top: 0,
              // left: 0,
              // bottom: 0,
              // right: 0,
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text>asdsadasd</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const getItemLayout = (data, index) => ({
    length: height,
    offset: height * index,
    index,
  });
  return (
    <View style={CONTAINER}>
      <FlatList
        snapToAlignment={'start'}
        pagingEnabled
        // onScroll={handleScroll}
        onScroll={({nativeEvent}: {nativeEvent: any}) => {
          handleScroll({nativeEvent});
          if (isCloseToBottom(nativeEvent)) {
            // enableSomeButton();
            handleLoadMore();
          }
        }}
        scrollEventThrottle={height}
        showsVerticalScrollIndicator={false}
        // snapToInterval={width + 10}
        // snapToInterval={} // Adjust to your content width decelerationRate={"fast"} pagingEnabled
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        // removeClippedSubview
        // maxToRenderPerBatch={15}
        key={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        keyExtractor={(item, index: any) => index.toString()}
        // style={{flex: 1}}
        // contentContainerStyle={{
        //   minHeight: '100%',
        //   //   flex: 1,
        //   width: '100%',
        // }}
        data={videoData}
      />
      {showLoadingIndicator && (
        <View
          style={{height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={'green'} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({});
