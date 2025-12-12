import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window');
const IS_TABLET = DeviceInfo.isTablet();

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {
  verticalScale as vs,
  horizontalScale as hs,
  IS_TABLET,
  height as HEIGHT,
  width as WIDTH,
  moderateScale as ms,
};

export const createChatId = (uid1, uid2) => {
  // sorts to ensure same order for both users
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};
