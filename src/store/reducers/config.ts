import { createReducer, createAction } from '@reduxjs/toolkit';
import { forIn } from 'lodash';
import { APP_DEFAULT } from '../../common/constants';
import type { ThemeColor, PrimaryColor } from '../../common/theme';

export interface ConfigState {
  themeType: ThemeColor,
  primaryColor: PrimaryColor
}

const initialState: ConfigState = {
  // @ts-ignore
  themeType: APP_DEFAULT.theme,
  // @ts-ignore
  primaryColor: APP_DEFAULT.primaryColor
};

export const updatePrimaryColor = createAction<PrimaryColor>('config/updatePrimaryColor');
export const updateTheme = createAction<ThemeColor>('config/updateTheme');
export const toggleTheme = createAction('config/toggleTheme');
export const updateConfig = createAction<Partial<ConfigState>>('config/updateConfig');
export const configReducer = createReducer(initialState, builder => {
  builder.addCase(updatePrimaryColor, (state, action) => {
    state.primaryColor = action.payload;
  });
  builder.addCase(updateTheme, (state, action) => {
    state.themeType = action.payload;
  });
  builder.addCase(toggleTheme, (state) => {
    state.themeType = (state.themeType === 'light') ? 'dark' : 'light';
  });
  builder.addCase(updateConfig, (state, { payload }) => {
    forIn(payload, (value, key) => {
      state[key] = value;
    });
  });
});
