import { bindActionCreators } from 'redux';
import * as actions from './actions';
import type { RootState } from './store';

export function mapStateToProps (state: RootState) {
  return {
    config: state.config,
    tabs: state.tabs
  }
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}