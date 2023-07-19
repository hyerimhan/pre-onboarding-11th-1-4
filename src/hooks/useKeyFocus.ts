import React from 'react';
import { ISearch } from 'interface/search';
import { useCallback, useState } from 'react';

const KEY_NAME = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
};

const useKeyFocus = (
  data: ISearch[],
  isOnFocus: boolean,
  setIsOnFocus: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOnFocus) return;
      if (event.isComposing) return;

      switch (event.key) {
        case KEY_NAME.arrowDown:
          event.preventDefault();
          setFocusIndex(currentIndex => Math.min(currentIndex + 1, data.length - 1));
          return;
        case KEY_NAME.arrowUp:
          event.preventDefault();
          setFocusIndex(currentIndex => Math.max(-1, currentIndex - 1));
          return;
        case KEY_NAME.enter:
          setSearchValue(data[focusIndex].sickNm);
          setIsOnFocus(false);
      }
    },
    [data, focusIndex, isOnFocus, setSearchValue, setIsOnFocus],
  );

  return { focusIndex, handleKeyDown, setFocusIndex };
};

export default useKeyFocus;
