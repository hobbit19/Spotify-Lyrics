import { browser } from 'webextension-polyfill-ts';

import { Message, Event } from './consts';

window.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  // Firefox CSP Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  script.src = browser.runtime.getURL('page.js');
  document.head.append(script);
});

window.addEventListener('message', ({ data }) => {
  if (data?.type === Event.SEND_SONGS) {
    browser.runtime.sendMessage(data);
  }
});

browser.runtime.onMessage.addListener((msg: Message) => {
  const { type } = msg;
  if (type === Event.GET_SONGS) {
    window.postMessage(msg, '*');
  }
});
