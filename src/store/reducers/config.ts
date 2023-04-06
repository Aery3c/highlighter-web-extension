import { createReducer } from '@reduxjs/toolkit';
import type { ThemeColor, PrimaryColor } from '../../common/theme';

export interface ConfigState {
  themeType: ThemeColor,
  primaryColor: PrimaryColor
}

const initialState: ConfigState = {
  themeType: 'light',
  primaryColor: 'orange'
};

export const configReducer = createReducer(initialState, {});
