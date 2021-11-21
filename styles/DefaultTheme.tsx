import {StatusBarStyle} from 'react-native';

const pallet = {
  black: 'black',
  darkerGrey: '#181818',
  darkGrey: '#1A1A1B',
  transparent: 'transparent',
  white: 'white',
};

interface StatusBar {
  barStyle: StatusBarStyle;
  backgroundColor: string;
}

interface Theme {
  colors: {
    black: string;
    darkGrey: string;
    darkerGrey: string;
    white: string;
  };
  statusBar: StatusBar;
}

export const DefaultTheme: Theme = {
  colors: {
    black: pallet.black,
    darkGrey: pallet.darkGrey,
    darkerGrey: pallet.darkerGrey,
    white: pallet.white,
  },
  statusBar: {
    barStyle: 'light-content',
    backgroundColor: pallet.darkGrey,
  },
};
