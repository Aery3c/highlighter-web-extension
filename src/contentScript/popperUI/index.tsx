import * as React from 'react';
import { createRoot } from "react-dom/client";
import PopperUI from './PopperUI';

window.onload = function () {
  if (document.body) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    // $FlowFixMe
    const container = document.body.appendChild(el);
    const root = createRoot(container);

    root.render(<PopperUI callback={() => console.log('[PopperUI]: loaded !!!')}/>);
  } else {
    console.error('[PopperUI error]: not found body element');
  }
}