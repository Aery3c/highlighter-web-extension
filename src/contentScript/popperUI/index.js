// @flow
'use strict'

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import consoleColors from '../../common/consoleColors';
import PopperUI from './PopperUI';

const log = consoleColors();

window.onload = () => {
  if (document.body) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    // $FlowFixMe
    const container = document.body.appendChild(el);
    const root = ReactDOMClient.createRoot(container);
    root.render(<PopperUI callback={() => log.pink.bold.log("[PopperUI]: loaded !!!")()} />);
  } else {
    log.red.bold.log('[PopperUI error]: not found body element')();
  }
}
