import { createReducer } from '@reduxjs/toolkit';

interface State {
  theme: 'dark' | 'light'
}

const initialState: State = {
  theme: 'light'
};

export const configReducer = createReducer(initialState, {});