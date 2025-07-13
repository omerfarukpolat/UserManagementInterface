import { useState, useMemo, useCallback } from 'react';

interface UseVirtualScrollingProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualScrollingResult<T> {
  virtualItems: T[];
  totalHeight: number;
  scrollTop: number;
  setScrollTop: (scrollTop: number) => void;
  startIndex: number;
  endIndex: number;
}

export function useVirtualScrolling<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: UseVirtualScrollingProps<T>): VirtualScrollingResult<T> {
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex: start, endIndex: end };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const virtualItems = useMemo(() => {
    if (items.length === 0) return [];
    if (items.length <= endIndex + 250) {
      return items.slice(startIndex, endIndex + 1);
    }
    return items.slice(startIndex, endIndex + 250);
  }, [items, startIndex, endIndex]);

  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  const setScrollTopCallback = useCallback((newScrollTop: number) => {
    setScrollTop(newScrollTop);
  }, []);

  return {
    virtualItems,
    totalHeight,
    scrollTop,
    setScrollTop: setScrollTopCallback,
    startIndex,
    endIndex,
  };
}
