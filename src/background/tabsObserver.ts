import type { Store } from 'redux';
import type { RootState } from '../store/store';
import type { TabState } from '../store/reducers/tabs';

function select (state: RootState): TabState {
	return state.tabs;
}

export function tabsObserver (store: Store, onChange: (tabs: TabState) => void) {
	let currentState: TabState;
	function handleChange() {
		const nextState: TabState = select(store.getState());
		if (nextState !== currentState) {
			currentState = nextState;
			onChange(currentState);
		}
	}

	const unsubscribe = store.subscribe(handleChange);
	handleChange();
	return unsubscribe;
}