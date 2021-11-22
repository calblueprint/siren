/* eslint-disable global-require */
import styled from 'styled-components/native';

export const Fonts = {
  'public-sans-black': require('./PublicSans-Black.otf'),
  'public-sans-blackit': require('./PublicSans-BlackItalic.otf'),
  'public-sans-bold': require('./PublicSans-Bold.otf'),
  'public-sans-boldit': require('./PublicSans-BoldItalic.otf'),
  'public-sans-extrabold': require('./PublicSans-ExtraBold.otf'),
  'public-sans-extraboldit': require('./PublicSans-ExtraBoldItalic.otf'),
  'public-sans-extralight': require('./PublicSans-ExtraLight.otf'),
  'public-sans-extralightit': require('./PublicSans-ExtraLightItalic.otf'),
  'public-sans-it': require('./PublicSans-Italic.otf'),
  'public-sans-light': require('./PublicSans-Light.otf'),
  'public-sans-lightit': require('./PublicSans-LightItalic.otf'),
  'public-sans-medium': require('./PublicSans-Medium.otf'),
  'public-sans-mediumit': require('./PublicSans-MediumItalic.otf'),
  'public-sans-regular': require('./PublicSans-Regular.otf'),
  'public-sans-semibold': require('./PublicSans-SemiBold.otf'),
  'public-sans-semiboldit': require('./PublicSans-SemiBoldItalic.otf'),
  'public-sans-thin': require('./PublicSans-Thin.otf'),
  'public-sans-thinit': require('./PublicSans-ThinItalic.otf'),
};

export const TextTitle = styled.Text`
  font-family: public-sans-semibold;
  font-size: 22px;
  margin: 10px 0px;
`;

export const TextBold = styled.Text`
  font-family: public-sans-semibold;
  font-size: 18px;
`;

export const TextRegular = styled.Text`
  font-family: public-sans-regular;
  font-size: 14px;
`;

export const TextSubtitle = styled.Text`
  font-family: public-sans-semibold;
  font-size: 16px;
  text-align: center;
`;

export const TextBoldItalic = styled.Text`
  font-family: public-sans-boldit;
`;

export const TextRegularWhite = styled.Text`
  font-family: public-sans-regular;
  font-size: 14px;
  color: white;
`;

export const TextRegularRed = styled.Text`
  font-family: public-sans-regular;
  font-size: 14px;
  color: red;
`;
