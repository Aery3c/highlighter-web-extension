import { createReducer, createAction } from '@reduxjs/toolkit';
import type { ThemeColor, PrimaryColor } from '../../common/theme';

export interface ConfigState {
  themeType: ThemeColor,
  primaryColor: PrimaryColor
}

const initialState: ConfigState = {
  themeType: 'light',
  primaryColor: 'gold'
};

export const updatePrimaryColor = createAction<PrimaryColor>('config/updatePrimaryColor');
export const updateTheme = createAction<ThemeColor>('config/updateTheme')
export const toggleTheme = createAction('config/toggleTheme')
export const configReducer = createReducer(initialState, builder => {
  builder.addCase(updatePrimaryColor, (state, action) => {
    state.primaryColor = action.payload;
  });
  builder.addCase(updateTheme, (state, action) => {
    state.themeType = action.payload;
  });
  builder.addCase(toggleTheme, (state, action) => {
    state.themeType = (state.themeType === 'light') ? 'dark' : 'light';
  });
});
