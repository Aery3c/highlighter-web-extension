import { createReducer, createAction } from '@reduxjs/toolkit';
import type { Tabs } from 'webextension-polyfill';

interface TabState {
	[key: number]: Tabs.Tab & {
    highlights: RangyHighlight[],
    isPopperMount: boolean;
  }
}

const initialState: TabState = {};
export const removeTab = createAction<number>('tabs/removeTab');
export const addTab = createAction<Tabs.Tab>('tabs/addTab');
export const updateTab = createAction<Tabs.Tab>('tabs/updateTab');
export const setPopperMount = createAction<{ tabId: number; isPopperMount: boolean}>('tabs/setPopperMount');
export const addHighlight = createAction<{ tabId: number; RangyHighlight: RangyHighlight }>('tabs/addHighlight');
export const replaceHighlights = createAction<{ tabId: number; highlights: RangyHighlight[] }>('tabs/replaceHighlights');
export const removeHighlight = createAction<{ tabId: number; highlightId: number }>('tabs/removeHighlight');
export const tabsReducer = createReducer(initialState, builder => {
	builder.addCase(addTab, (state, { payload }) => {
		state[payload.id] = {
			highlights: [],
			isPopperMount: false,
			...payload
		};
	});
	builder.addCase(updateTab, (state, { payload }) => {
		state[payload.id] = {
			highlights: [],
			isPopperMount: false,
			...payload,
			...state[payload.id]
		};
	});
	builder.addCase(removeTab, (state, { payload: tabId }) => {
		delete state[tabId];
	});
	builder.addCase(addHighlight, (state, { payload: { tabId, RangyHighlight } }) => {
		state[tabId].highlights.push(RangyHighlight);
	});
	builder.addCase(replaceHighlights, (state, { payload: { tabId, highlights } }) => {
		state[tabId].highlights = highlights;
	});
	builder.addCase(removeHighlight, (state, { payload: { tabId, highlightId } }) => {
		const highlights = state[tabId].highlights;
    state[tabId].highlights = highlights.filter(item => item.id !== highlightId);
	});
});