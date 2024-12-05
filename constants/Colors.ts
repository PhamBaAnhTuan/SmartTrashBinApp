/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const onText = '#ECEDEE';
const error = 'red';
const blue = '#1976d2';

export const Colors = {
  light: {
    text: '#11181C',
    onText: onText,
    background: '#fff',
    card: '#0e1e2d',
    icon: '#687076',
    error: error,
    blue: blue,

    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    onText: onText,
    background: '#151718',
    card: '#0e1e2d',
    icon: '#9BA1A6',
    error: error,
    blue: blue,

    tint: tintColorDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
