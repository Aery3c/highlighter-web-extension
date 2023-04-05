import { createReducer } from '@reduxjs/toolkit';

interface State {
  [key: number]: {
    characterRange: [number, number]
  }
}

const initialState: State = {};
export const tabsReducer = createReducer(initialState, {});