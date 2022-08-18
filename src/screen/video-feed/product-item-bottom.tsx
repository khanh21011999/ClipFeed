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
import {RFValue} from 'react-native-responsive-fontsize';
import {mockItemStoreUrl} from '../../constant/string';
import {width} from '../../theme/size';
import {height} from '../../theme/size';
export default function ProductItemBottom({onPress, item, onPressAddedToCart}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={styles.wrapper}>
        <View style={styles.opacityWrapper} />
        <View style={styles.avatarContainer}>
          <Image
            resizeMode="cover"
            source={{uri: item.avatar_url}}
            style={styles.imageAvatar}
          />
        </View>
        <View style={styles.authorName}>
          <Text numberOfLines={1} style={styles.authorNameText}>
            {item.name_en}
          </Text>
          <Text numberOfLines={1} style={styles.bioEng}>
            {item?.bio_en}
          </Text>
          <Text numberOfLines={1} style={styles.baseCost}>
            {item?.cost_ios}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <TouchableOpacity
            onPress={() => {
              onPressAddedToCart();
            }}
            style={styles.addToCartContainer}>
            <Text style={styles.addToCartText} numberOfLines={2}>
              ADD TO CART
            </Text>
            <View style={styles.border} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',

    marginBottom: RFValue(4),
    height: height * 0.15,
    width: width * 0.8,

    // backgroundColor: 'black',
    // opacity: 0.3,
    justifyContent: 'center',
    // paddingHorizontal: RFValue(4),
    alignItems: 'center',
    borderRadius: RFValue(32),
  },
  container: {
    marginBottom: RFValue(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacityWrapper: {
    position: 'absolute',
    // height: '100%',
    // width: '100%',
    opacity: 0.6,

    backgroundColor: 'black',
    // opacity: 0.3,
    borderRadius: RFValue(16),
    height: height * 0.12,
    width: width * 0.9,
  },
  avatarContainer: {
    flex: 2,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageAvatar: {
    height: height * 0.07,
    width: height * 0.07,
    borderRadius: height * 0.04,
  },
  authorName: {
    flex: 4,
    marginLeft: RFValue(8),
    height: '60%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  authorNameText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: 'white',
  },
  bioEng: {
    fontSize: RFValue(11),
    marginTop: RFValue(2),
    marginBottom: RFValue(4),

    color: 'white',
    fontWeight: '300',
  },
  baseCost: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartContainer: {
    height: '50%',
    width: '80%',
    borderRadius: RFValue(4),
    marginLeft: RFValue(4),
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F20D76',
  },
  addToCartText: {
    fontSize: RFValue(11),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  border: {
    position: 'absolute',
    height: RFValue(3.5),
    width: '80%',
    opacity: 0.3,
    borderRadius: RFValue(4),
    bottom: RFValue(2),
    backgroundColor: 'black',
  },
});
