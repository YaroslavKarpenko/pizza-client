import React from 'react';

type ResizeEffect = (entries: ResizeObserverEntry[]) => void;

export const useResizeEffect = (effect: ResizeEffect): void => {
  const resizeObserver = new ResizeObserver((entries) => {
    effect(entries);
  });

  React.useLayoutEffect(() => {
    resizeObserver.observe(window.document.body);
    return () => resizeObserver.disconnect();
  }, []);
};
