import { useBreakpoints as useBase } from '@vueuse/core';
import breakpoints from '../../config/breakpoints.json';

export function useBreakpoints() {
  return useBase(breakpoints);
}
