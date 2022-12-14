/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
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
  Alert,
} from 'react-native';
import {apiUrl, colors, mockNav} from '../../constant/string';

import Video from 'react-native-video';
import {height, width} from '../../theme/size';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {makeMutable} from 'react-native-reanimated';
import ProductItemBottom from './product-item-bottom';
import BottomSheet from '@gorhom/bottom-sheet';
import PopUpSheet from './pop-up-sheet';

const CONTAINER: ViewStyle = {
  flex: 1,
  //   minHeight: height,
  //   width: width,
};

export default function VideoFeed() {
  const [videoData, setVideoData] = useState<any>([]);
  const [pause, setPause] = useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState<any>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState<any>(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleLoadMore = () => {
    setShowLoadingIndicator(true);
    getVideoData(currentPage + 1, perPage);
  };

  useEffect(() => {
    getVideoData(currentPage, perPage);
  }, []);
  const setShowModalFunc = value => {
    setShowModal(value);
  };
  const getVideoData = async (currPage, perP) => {
    axios.get(apiUrl(currPage, perP)).then((data: any) => {
      data?.data?.data.forEach((item: any) => {
        item.isPause = true;
        item.isLike = false;
        item.totalLike = 0;
        item.isMute = false;
        item.talent.isAddedToCart = false;
        // item.randomId = Math.floor(Math.random() * 100000 + 1);
      });
      const newData = [...videoData, ...data?.data?.data];
      setVideoData(newData);
      setShowLoadingIndicator(false);
      setCurrentPage(currentPage + 1);
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

  const onClickAddToCart = index => {
    // console.log('item', item);
    const newData = videoData.map((itemList: any, indexList) => {
      if (index === indexList) {
        return {
          ...itemList,
          talent: {
            isAddedToCart: true,
          },
        };
      }
      return itemList;
    });
    setVideoData(newData);
  };
  const renderItem = ({item, index}: {item: any; index: any}) => {
    const setPauseValue = () => {
      if (index === focusedIndex && item?.isPause === true) {
        return false;
      } else if (item?.isPause === false && index === focusedIndex) {
        return true;
      } else if (index !== focusedIndex) {
        return true;
      }
    };

    const renderIconItem = (
      iconName,
      onPress,
      itemColor,
      value?,
      renderMute = false,
      muteColor?,
    ) => {
      return (
        <View style={styles.renderIconContainer}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}
            style={styles.renderIconWrapper}>
            <View style={styles.opacityIconWrapper} />
            {renderMute ? (
              <FontAwesome5
                name={'volume-mute'}
                size={RFValue(20)}
                color={muteColor}
              />
            ) : (
              <IoniIcon name={iconName} size={RFValue(28)} color={itemColor} />
            )}
          </TouchableOpacity>
          {!renderMute && (
            <Text style={{fontSize: RFValue(16), color: 'white'}}>
              {value ? value : 0}
            </Text>
          )}
        </View>
      );
    };
    const renderAvatar = avatarUrl => {
      return (
        <TouchableOpacity
          onPress={() => {
            // onPress();
          }}
          style={styles.renderAvatarWrapper}>
          <Image
            source={{uri: avatarUrl}}
            resizeMode="center"
            style={styles.avatarImg}
          />
        </TouchableOpacity>
      );
    };

    const onClickLike = () => {
      const newData = videoData.map((itemList, itemListIndex) => {
        if (index === itemListIndex) {
          return {
            ...itemList,
            isLike: !itemList.isLike,
            totalLike: itemList.isLike
              ? itemList.totalLike - 1
              : itemList.totalLike + 1,
          };
        }
        return itemList;
      });

      setVideoData(newData);
    };
    const renderAddedToCart = () => {
      return (
        <View style={styles.addToCartWrapper}>
          <IoniIcon
            name="checkmark-circle-sharp"
            color={colors.green}
            size={RFValue(24)}
          />
          <Text style={styles.addToCartText}>ADDED TO CART</Text>
        </View>
      );
    };
    const onClickMute = () => {
      const newData = videoData.map((itemList, itemListIndex) => {
        if (index === itemListIndex) {
          return {
            ...itemList,
            isMute: !itemList?.isMute,
          };
        }
        return itemList;
      });
      setVideoData(newData);
    };

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const newData = videoData.map((itemList: any) => {
            if (itemList?.id === item.id) {
              return {
                ...itemList,
                isPause: !itemList.isPause,
              };
            }
            return itemList;
          });

          setVideoData(newData);
        }}>
        <View
          style={{
            height: height,
            width: width,
          }}>
          <Video
            // controls
            poster={item?.thumbnail}
            paused={setPauseValue()}
            repeat
            resizeMode="cover"
            source={{uri: item?.url}}
            style={styles.videoContainer}
          />
          <View style={styles.rightMenu}>
            {renderIconItem(
              'heart',
              onClickLike,
              item?.isLike ? 'red' : 'white',
              item?.totalLike,
            )}
            {renderIconItem('chatbubble-ellipses-outline', () => {}, 'white')}
            {renderAvatar(item?.thumbnail)}
            {renderIconItem(
              '',
              onClickMute,
              'white',
              '',
              true,
              item?.isMute ? 'red' : 'white',
            )}
          </View>
          <View style={styles.productIemContainer}>
            {item?.talent?.isAddedToCart ? (
              <View>{renderAddedToCart()}</View>
            ) : (
              <ProductItemBottom
                onPressAddedToCart={() => {
                  onClickAddToCart(index);
                }}
                item={item?.talent}
                onPress={() => {
                  setModalData(item?.talent);
                  setShowModalFunc(true);
                  setCurrentIndex(index);
                }}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };
  const getItemLayout = (data, index) => ({
    length: height,
    offset: height * index,
    index,
  });
  return (
    <View style={CONTAINER}>
      <PopUpSheet
        data={modalData}
        isVisible={showModal}
        setVisible={() => {
          setShowModalFunc(false);
        }}
        addToCart={() => {
          onClickAddToCart(currentIndex);
        }}
      />
      <FlatList
        snapToAlignment={'start'}
        pagingEnabled
        // onScroll={handleScroll}
        onScroll={({nativeEvent}: {nativeEvent: any}) => {
          handleScroll({nativeEvent});
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={height}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        // removeClippedSubview
        // maxToRenderPerBatch={15}
        key={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        keyExtractor={(item, index: any) => index.toString()}
        data={videoData}
      />
      {showLoadingIndicator && (
        <View style={styles.indicator}>
          <ActivityIndicator color={'green'} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  renderIconContainer: {
    marginBottom: RFValue(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderIconWrapper: {
    height: RFValue(48),
    marginBottom: RFValue(4),
    width: RFValue(48),

    // backgroundColor: 'black',
    // opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(32),
  },
  opacityIconWrapper: {
    position: 'absolute',
    // height: '100%',
    // width: '100%',
    opacity: 0.6,

    backgroundColor: 'black',
    // opacity: 0.3,
    borderRadius: RFValue(32),
    height: RFValue(48),
    width: RFValue(48),
  },
  renderAvatarWrapper: {
    height: RFValue(48),
    width: RFValue(48),
    marginBottom: RFValue(16),
    borderWidth: 3,
    borderColor: 'white',
    // backgroundColor: 'black',
    // opacity: 0.3,
    justifyContent: 'center',

    alignItems: 'center',
    borderRadius: RFValue(32),
  },
  avatarImg: {
    height: '95%',
    width: '95%',
    borderRadius: RFValue(32),
  },
  addToCartWrapper: {
    height: 0.08 * height,
    width: width * 0.9,
    // paddingBottom: height * 0.1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(16),
    borderRadius: RFValue(16),
    // justifyContent: 'center',
  },
  addToCartText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
    paddingLeft: RFValue(16),
  },
  videoContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  productIemContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: height * 0.1,
  },
  rightMenu: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.2,
  },
  indicator: {
    height: height,
    width: width,
    position: 'absolute',
    alignItems: 'center',
    // backgroundColor: 'transparent',

    justifyContent: 'center',
  },
});
