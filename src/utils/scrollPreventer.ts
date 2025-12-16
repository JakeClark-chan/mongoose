import { disablePageScroll, enablePageScroll } from 'scroll-lock';

function disableScroll() {
  disablePageScroll();
}

function enableScroll() {
  enablePageScroll();
}

export { disableScroll, enableScroll };
