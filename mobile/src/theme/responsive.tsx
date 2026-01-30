import {Dimensions, NativeModules} from 'react-native';

export const {width: mdblScreenWidth, height: mbdlScreenHeight} =
  Dimensions.get('window');
const mdblWIDTH_XD = 375;
const mdblHEIGHT_XD = 812;
const {StatusBarManager} = NativeModules;

export const mdblBAR_HEIGHT = StatusBarManager.HEIGHT;

export const widthScale = (size: number) =>
  (mdblScreenWidth / mdblWIDTH_XD) * size;
export const heightScale = (size: number) =>
  (mbdlScreenHeight / mdblHEIGHT_XD) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (widthScale(size) - size) * factor;
