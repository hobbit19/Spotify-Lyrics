const TRACK_INFO_SELECTOR = '.track-info';
const TRACK_NAME_SELECTOR = '.track-info__name';
const TRACK_ARTIST_SELECTOR = '.track-info__artists';

export interface Query {
  name: string;
  artist: string;
}

function getQueryObj(element: Element): Query {
  const name = element.querySelector(TRACK_NAME_SELECTOR)?.textContent;
  const artist = element.querySelector(TRACK_ARTIST_SELECTOR)?.textContent;
  return { name: name || '', artist: artist || '' };
}

const weakMap = new WeakMap<Element, MutationObserver>();

export default function songObserver(callback: (query: Query) => any) {
  let trackInfo: Element | null = null;
  const observer = new MutationObserver(() => {
    const element = document.querySelector(TRACK_INFO_SELECTOR);
    if (!element) {
      if (trackInfo) {
        const ob = weakMap.get(trackInfo);
        ob?.disconnect();
      }
    } else if (!weakMap.has(element)) {
      callback(getQueryObj(element));
      const observer = new MutationObserver(() => {
        callback(getQueryObj(element));
      });
      observer.observe(element, { childList: true, characterData: true, subtree: true, attributes: true });
      weakMap.set(element, observer);
    }
    trackInfo = element;
  });
  observer.observe(document.body, { childList: true });
}