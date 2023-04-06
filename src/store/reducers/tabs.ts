import { createReducer, createAction } from '@reduxjs/toolkit';

export interface Mark {
  start: number;
  end: number;
  className: string;
}
export interface TabState {
  [key: number]: {
    marks: Mark[]
  }
}

export const addMark = createAction<{ tabId: number, mark: Mark }>('tabs/addMark');

const initialState: TabState = {};
export const tabsReducer = createReducer(initialState, builder => {
  builder.addCase(addMark, (state, action) => {
    const { tabId, mark } = action.payload;
    if (state?.[tabId]?.marks) {
      state[tabId].marks.push(mark);
    } else {
      // first
      state[tabId] = {
        marks: [mark]
      }
    }
  });
});