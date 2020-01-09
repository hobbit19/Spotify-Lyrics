import { MessageCallType, ExtensionMessage, ExtReplyPrefix, ExtMessageType } from '../common';

let id = 0;
export function contentScriptCall(call: MessageCallType, data: any) {
  ++id;
  const message: ExtensionMessage = {
    type: ExtMessageType,
    id,
    call,
    data,
  };
  postMessage(message, '*');
  let resolve: Function;
  let reject: Function;
  setTimeout(() => reject(new Error('call timeout')), 1000);
  window.addEventListener(
    `${ExtReplyPrefix}${id}`,
    ({ detail }: CustomEvent & { detail: any }) => {
      console.log('spotify-lyrics-reply:', detail);
      resolve(detail);
    },
    { once: true },
  );
  return new Promise<any>((res, rej) => {
    resolve = res;
    reject = rej;
  });
}