import { createReducer, createAction } from '@reduxjs/toolkit';

export interface Mark {
  start: number;
  end: number;
  className: string;
  text: string;
}
export interface TabState {
  [key: number]: {
    marks: Mark[]
  }
}

interface Params {
  tabId: number;
  mark: Mark ;
}

export const addMark = createAction<Params>('tabs/addMark');
export const removeMark = createAction<Params>('tabs/removeMark');
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
  builder.addCase(removeMark, (state, action) => {
    const { tabId, mark: markWithRemoved } = action.payload;
    const marks = state[tabId].marks;
    let mark: Mark;
    for (let i = 0; (mark = marks[i]);) {
      if (isEqual(mark, markWithRemoved)) {
        marks.splice(i++, 1);
      }
    }
  });
});

function isEqual (mark: Mark, oldMark: Mark): boolean {
  return (mark.start === oldMark.start)
      && (mark.end === oldMark.end)
      && (mark.className === oldMark.className)
      && (mark.text === oldMark.text)
}