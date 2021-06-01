import chroma from 'chroma-js';
import C, { apply, boxShadow } from 'consistencss';
import { Dimensions, Platform } from 'react-native';

export const DESKTOP_HUGE = 1440;
export const DESKTOP = 1024;
export const TABLET = 768;
export const MOBILE = 375;


export const textColor = color => ({color: color});
export const tintColor = color => ({tintColor: color});
export const maxWidth = (perc = 1) => ({maxWidth: deviceWidth * perc});
export const percWidth = (perc = 1) => ({width: deviceWidth * perc});
export const percHeight = (perc = 1) => ({height: deviceHeight * perc});

/**Responsiveness*/
export const isWeb = Platform.OS === 'web';


export const w100 = (num = 70) => ({maxWidth: deviceWidth * num});
export const h100 = (num = 70) => ({maxHeight: deviceHeight * num});
export const minH100 = (num = 70) => ({minHeight: deviceHeight * num});

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

export const respL = isWeb && deviceWidth >= DESKTOP_HUGE; //Gegant => container 1200 (300)
export const respM =
  isWeb && deviceWidth > DESKTOP && deviceWidth < DESKTOP_HUGE; // Margin 32 (8)
export const respS = isWeb && deviceWidth > TABLET && deviceWidth < DESKTOP; //Tablet   => Margin 28 (7)
export const respXS = isWeb && deviceWidth < TABLET && deviceWidth > MOBILE; //Tablet   => Margin 28 (7)
export const respMob = isWeb && deviceWidth < MOBILE; //Mobile M  // Margin 24 (6)

export const isSmall = isWeb && deviceWidth < TABLET;
export const isNarrow = isWeb && deviceWidth < 380;
export const isPhoneBrowser = isWeb && deviceWidth < 480;
export const isIOS = Platform.OS === 'ios';

/**Most important wrapper container*/
export const respWrap = [
  percWidth(),
  respL ? C.w300 : respM ? C.px8 : respS ? C.px7 : C.px6,
  isSmall && [percWidth(), C.px6],
  /*{width: deviceWidth * (isWide ? 0.7 : 0.8)]}*/
];

/**Most important container*/
export const respWidth = [respS ? C.maxw180 : maxWidth(0.7)];


export const colors = {
  blue: '#355eb9',
  black: '#020202',
  black40: 'rgba(0, 0, 0, 0.4)',
  wood: '#804000',
  salmon: '#c14e2b',
  salmon40: '#c14e2b20',
  blueGrey: '#9399ac',
  grass: '#baf2b5',
  blueGreen: '#006637',
  greenDark: '#276622',
  green: '#418a6e',
  water: '#60a6d0',
  ground: '#d5db7a',
  groundSand: '#bc9c4f',
  sand: '#efd9a2',
  sand30: '#efd9a230',
  white: '#ffffff',
  paleGreyTwo: '#eff2f9',
  paleGreyThree: '#dee0e6',
  black12: 'rgba(0, 0, 0, 0.12)',
  paleGrey: '#f6f7fc',
};

export const bgColor = (color = colors.blueGrey) => ({backgroundColor: color});
export const bordColor = (color = colors.blueGrey, width = 1) => ({
  borderColor: color,
  borderWidth: width,
});

export const iconSizeBig = respM ? C.font16 : C.font12;
export const textSize = {
  Xs: respM ? C.font4 : C.font3,
  Sm: respM ? C.font6 : C.font6,
  Md: respM ? C.font9 : C.font6,
  L: respM ? C.font14 : C.font10,
  XL: respM ? C.font16 : C.font13,
};
export const cell = {
  XXs: apply(respM ? [C.w4, C.w4] : [C.w3, C.h3]), // 6 & 4
  Xs: apply(respM ? [C.minw6, C.minh6] : [C.w5, C.h5]), // 6 & 4
  Sm: apply(respM ? [C.w8, C.h8] : [C.w7, C.h7]), // 17 & 12
  Md: apply(respM ? [C.w20, C.w20, C.flex, C.minh20] : [C.w13, C.h13]), // 20 & 13
  L: apply(respM ? [C.w22, C.w22, C.flex, C.minh22] : [C.w13, C.h13]), // 22 & 14
  XL: apply(respM ? [C.w24, C.w24, C.flex, C.minh24] : [C.w24, C.h24]), // 24 & 14
  XXL: apply(C.w48, C.h48, C.flex, C.minh48), // 24 & 14
};

export const absCenter = [
  C.absolute,
  isIOS && C.mt8,
  C.itemsCenter,
  C.justifyCenter,
  C.top0,
  !isSmall && [C.right0, C.left0],
];

export const headerWrapper = apply(
  C.shadowMd,
  bgColor(colors.paleGrey),
  C.itemsCenter,
  C.contentCenter,
  C.justifyBetween,
  C.row,
  C.wFull,
  C.radius4,
  isSmall ? C.p4 : C.p2,
);
export const imgBig = isSmall ? [C.w48, C.h48] : [C.w32, C.h32];
export const imgSmall = isSmall ? [C.w8, C.h8] : [C.w16, C.h16];
export const imgXS = isSmall ? [C.w6, C.h6] : [C.w10, C.h10];
export const respImg = apply(C.radius2, imgBig, C.p4, C.shadowMd);

export const badgeWrap = apply(
  C.absolute,
  C.right_1,
  C.radius4,
  C.shadowMd,
  C.bgWhite,
  C.flex,
  C.itemsCenter,
);
export const darkShadow = boxShadow(1, 0, 1, 8, colors.black40, 1);
export const shadow = (col = colors.paleGreyThree, blur = 5, opacity = 1) =>
  boxShadow(blur, 1, 1, blur, col, opacity);

export const topBorder = {
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
};

export const imgs = {
  charm: isWeb
    ? {
        uri:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png',
      }
    : require('../assets/charm.png'),
  spin: {uri: 'https://i.ibb.co/VCF4Rw4/mvprio.gif'},
};

/**Fonts*/
export const fonts = {
  input: {
    fontFamily: 'Avenir-Roman',
    fontSize: respM ? 20 : 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.blueGrey,
  },
  title1: {
    fontFamily: 'Avenir',
    fontSize: isSmall ? 20 : 24,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.black,
  },
  subtitle: {
    fontFamily: 'Avenir',
    fontSize: respM ? 20 : 20,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.black,
  },
  caption: {
    fontFamily: 'Avenir',
    fontSize: respM ? 13 : 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.black,
  },
  body1: {
    fontFamily: 'Avenir',
    fontSize: respM ? 20 : 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.black,
  },
  body2: {
    fontFamily: 'Avenir',
    fontSize: respM ? 16 : 14,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.black,
  },
};

export const strikeThrough = {
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
};

export const gradFull = chroma.scale(Object.values(colors));
export const grad = chroma.scale([
  colors.blueGreen,
  colors.blue,
  colors.salmon,
  'red',
]);
