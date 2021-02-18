import {colors} from './color';

export const fonts = {
  poppins: {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold'
  }
};

export const textStyles = {
  title: {
    fontSize: 36,
    lineHeight: 43,
    fontFamily: fonts.poppins.regular,
    color: colors.gray900,
  },
  headline: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fonts.poppins.semiBold,
    color: colors.gray900,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: fonts.poppins.regular,
    color: colors.gray900,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.poppins.regular,
    color: colors.gray900,
  },
};
