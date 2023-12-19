import { Theme } from '@react-navigation/native';
import Colors from './Colors';

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors['dark'].primary,
    background: Colors['dark'].background,
    card: Colors['dark'].card,
    text: Colors['dark'].text,
    border: Colors['dark'].border,
    notification: 'rgb(255, 69, 58)',
  },
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors['light'].primary,
    background: Colors['light'].background,
    card: Colors['light'].card,
    text: Colors['light'].text,
    border: Colors['light'].border,
    notification: 'rgb(255, 59, 48)',
  },
};
