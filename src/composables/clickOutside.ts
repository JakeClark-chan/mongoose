import { MaybeElementRef, unrefElement, tryOnScopeDispose } from '@vueuse/core';
import { isString } from 'lodash';

interface UseClickOutsideOptions {
  includes?: () => (MaybeElementRef | string)[];
}

export function useClickOutside(
  element: MaybeElementRef,
  callback: () => void,
  options: UseClickOutsideOptions = {}
) {
  function cleanup() {
    window.removeEventListener('mousedown', onClick, { capture: true });
  }

  const stopWatch = watch(
    () => unrefElement(element),
    (el) => {
      if (el) {
        cleanup();
        window.addEventListener('mousedown', onClick, { capture: true });
      }
    },
    { immediate: true }
  );

  function onClick(e: Event) {
    const el = unrefElement(element);

    const includeEls = [] as Element[];

    const optionIncludes = [];

    if (options.includes) {
      optionIncludes.push(...options.includes());
    }

    optionIncludes.forEach((include) => {
      if (isString(include)) {
        includeEls.push(...document.querySelectorAll(include));
      } else {
        const element = unrefElement(include);
        if (element) {
          includeEls.push(element);
        }
      }
    });

    if (!el) {
      return;
    }

    const contains = el.contains(e.target as HTMLElement);

    let containsIncludes = false;
    if (includeEls.length > 0) {
      containsIncludes = includeEls.some((exceptionEl) =>
        exceptionEl?.contains(e.target as HTMLElement)
      );
    }

    const outside = !contains && !containsIncludes;

    if (outside) {
      callback();
    }
  }

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    stop,
  };
}
