/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ViewProps,
  TextProps,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {colors, mockItem} from '../../constant/string';
import {height, width} from '../../theme/size';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
export default function PopUpSheet({isVisible, setVisible, data, addToCart}) {
  return (
    <Modal
      isVisible={isVisible}
      style={{justifyContent: 'flex-end'}}
      onBackdropPress={() => {
        setVisible();
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setVisible();
          }}
          style={styles.closeText}>
          <Ionicon name={'close'} size={RFValue(24)} />
        </TouchableOpacity>
        <View style={styles.swiperContainer}>
          <Swiper
            dot={<View style={styles.swipeDot} />}
            activeDot={<View style={styles.swipeDotActive} />}>
            {mockItem.map((item, index) => (
              <View key={index} style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={{uri: item.img}}
                  resizeMode="cover"
                  style={styles.imageSwiperContainer}
                />
              </View>
            ))}
          </Swiper>
          <View style={styles.priceContainer}>
            <View style={styles.exclusive}>
              <Text style={styles.exclusiveText}>EXCLUSIVE</Text>
            </View>
            <View style={styles.priceValueContainer}>
              <Text style={styles.reducedCost}>{data?.cost_ios}</Text>
              <Text style={styles.realCode}> {data?.cost}</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.avatarRowContainer}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    // alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: data?.avatar_url}}
                    resizeMode={'cover'}
                    style={styles.avatarImg}
                  />
                </View>
                <View style={styles.avatarNameContainer}>
                  <Text style={styles.detailAvatarContainer}>
                    {data.name_en}
                  </Text>
                  <Text>Actor ► Egypt</Text>
                </View>
                <View style={{flex: 1}} />
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingWrapper}>
                <AntDesign
                  name="star"
                  size={RFValue(16)}
                  color={colors.starYellow}
                />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
              <Text style={styles.totalRatingText}>33 reviews</Text>
            </View>
          </View>
          <View>
            <Text style={styles.descritionHeader}>Description</Text>
            <Text numberOfLines={4}>{data.bio_en}</Text>
            <Text style={styles.seeMore}>See more</Text>
          </View>
        </View>
        <View style={styles.rowBottomContainer}>
          <TouchableOpacity
            onPress={() => {
              setVisible();
            }}
            style={styles.addVideoReview}>
            <View style={styles.addVideoReviewContainer}>
              <Ionicon name="videocam" size={RFValue(24)} color="white" />
              <Text style={styles.addVideoReviewText}>ADD VIDEO REVIREW</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addToCart();
              setVisible();
            }}
            style={styles.addToCartContainer}>
            <View style={styles.addToCartTextContainer}>
              <Ionicon name="cart" size={RFValue(24)} color="white" />
              <Text style={styles.addToCartText}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height * 0.8,
    width: width,
    borderRadius: RFValue(16),
    alignSelf: 'center',
    padding: RFValue(16),
    paddingHorizontal: RFValue(24),
    backgroundColor: 'white',
  },
  closeText: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  swiperContainer: {flex: 4.5, alignItems: 'center', justifyContent: 'center'},
  swipeDot: {
    backgroundColor: '#DDD8DE',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  swipeDotActive: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  imageSwiperContainer: {
    width: '60%',
    flex: 1,

    borderRadius: RFValue(4),
  },
  priceContainer: {
    paddingTop: RFValue(16),
    alignSelf: 'flex-end',
  },
  exclusive: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    padding: RFValue(2),
    width: 0.2 * width,
    paddingHorizontal: RFValue(6),
    borderRadius: RFValue(4),
  },
  exclusiveText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(10),
    // backgroundColor:
  },
  priceValueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  reducedCost: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  realCode: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: colors.primary,
  },
  line: {
    height: RFValue(2),
    marginTop: RFValue(16),
    width: '100%',
    backgroundColor: '#D9D5D9',
  },
  descriptionContainer: {
    // flex: 2,
    paddingTop: RFValue(8),
  },
  avatarRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(16),
  },
  avatarImg: {
    // flex: 1,
    height: RFValue(48),
    width: RFValue(48),

    borderRadius: RFValue(24),
  },
  avatarNameContainer: {justifyContent: 'center', marginLeft: RFValue(16)},
  detailAvatarContainer: {fontSize: RFValue(12), fontWeight: 'bold'},
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  ratingText: {fontSize: RFValue(12), marginLeft: RFValue(4)},
  totalRatingText: {fontSize: RFValue(11), marginTop: RFValue(8)},
  descritionHeader: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
  },
  seeMore: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    paddingTop: RFValue(4),
    color: '#817E81',
  },
  rowBottomContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: RFValue(24),
  },
  addVideoReview: {
    height: '40%',
    backgroundColor: 'black',
    flex: 4,
    borderRadius: RFValue(6),
    alignItems: 'center',
    justifyContent: 'center',

    marginRight: RFValue(4),
  },
  addVideoReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addVideoReviewText: {
    fontSize: RFValue(11),
    marginLeft: RFValue(4),
    fontWeight: 'bold',
    color: 'white',
  },
  addToCartContainer: {
    height: '40%',
    backgroundColor: colors.primary,
    flex: 6,
    borderRadius: RFValue(6),
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: RFValue(4),
  },
  addToCartTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: RFValue(11),
    marginLeft: RFValue(4),
    fontWeight: 'bold',
    color: 'white',
  },
});
