import React, { useState, useRef, KeyboardEvent } from 'react';

interface Props {
  currentIndex: number;
  ulRef: React.RefObject<HTMLUListElement>;
  handleKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const KEY_NAME = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
};

const useKeyFocus = (
  dataLength: number,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,
): Props => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (dataLength > 0) {
      switch (event.key) {
        case KEY_NAME.arrowDown:
          setCurrentIndex(currentIndex + 1);
          if (ulRef.current?.childElementCount === currentIndex + 1) setCurrentIndex(0);
          break;
        case KEY_NAME.arrowUp:
          setCurrentIndex(currentIndex - 1);
          if (currentIndex <= 0) setCurrentIndex(ulRef.current!.childElementCount - 1);
          break;
        case KEY_NAME.enter:
          setCurrentIndex(-1);
          setKeyword(ulRef.current?.children[currentIndex].textContent?.substring(2) as string);
          break;
      }
    }
  };
  return { currentIndex, ulRef, handleKeyPress, setCurrentIndex };
};

export default useKeyFocus;
