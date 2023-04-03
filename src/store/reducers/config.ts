import { createReducer } from '@reduxjs/toolkit';
import type { ThemeColor, PrimaryColor } from '../../common/theme';

interface State {
  themeType: ThemeColor,
  primaryColor: PrimaryColor
}

const initialState: State = {
  themeType: 'light',
  primaryColor: 'orange'
};

export const configReducer = createReducer(initialState, {});
