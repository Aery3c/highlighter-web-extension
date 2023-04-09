import { createReducer, createAction } from '@reduxjs/toolkit';
import type { Tabs } from 'webextension-polyfill';

export interface Mark {
  start: number;
  end: number;
  className: string;
  text: string;
  markId: number;
}

export interface PopperState {
  isMount: boolean;
}

export interface TabState {
  [key: number]: Tabs.Tab & {
    marks?: Mark[],
    popperState?: PopperState;
  }
}

export const addMark = createAction<{ tabId: number; mark: Mark;}>('tabs/addMark');
export const removeMark = createAction<{ tabId: number; markId: number;}>('tabs/removeMark');
export const updateMark = createAction<{ tabId: number; marks: Mark[] }>('tabs/updateMark');
export const updatePopperState = createAction<{ tabId: number; popperState: PopperState}>('tabs/setPopperMount');
export const removeTab = createAction<number>('tabs/removeTab');
export const addTab = createAction<Tabs.Tab>('tabs/addTab');
export const updateTab = createAction<Tabs.Tab>('tabs/updateTab');

const initialState: TabState = {};
export const tabsReducer = createReducer(initialState, builder => {
  builder.addCase(addMark, (state, action) => {
    const { tabId, mark } = action.payload;
    state[tabId].marks.push(mark);
  });
  builder.addCase(removeMark, (state, action) => {
    const { tabId, markId: removeId } = action.payload;
    const marks = state[tabId].marks;
    let mark: Mark;
    for (let i = 0; (mark = marks[i]);) {
      if (mark.markId === removeId) {
        marks.splice(i++, 1);
      }
    }
  });
  builder.addCase(updateMark, (state, action) => {
    const { tabId, marks } = action.payload;
    state[tabId].marks = [
      ...state[tabId].marks,
      ...marks
    ];
  });
  builder.addCase(updatePopperState, (state, action) => {
    const { tabId, popperState } = action.payload;
    const currentTab = state[tabId];
    currentTab.popperState = {
      ...currentTab.popperState,
      ...popperState,
    }
  });
  builder.addCase(addTab, (state, action) => {
    state[action.payload.id] = {
      ...action.payload,
      marks: [],
      popperState: { isMount: false }
    }
  });
  builder.addCase(removeTab, (state, action) => {
    delete state[action.payload];
  });
  builder.addCase(updateTab, (state, action) => {
    const tabId = action.payload.id;
    state[tabId] = {
      marks: [],
      popperState: { isMount: false },
      ...state[tabId],
      ...action.payload,
    }
  });
});