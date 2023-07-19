import React, { useState, useEffect } from 'react';

const useCardOpen = () => {
  const [cardOpen, setCardOpen] = useState(false);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardOpen(true);
  };

  const toggleClose = () => setCardOpen(false);

  useEffect(() => {
    window.addEventListener('click', toggleClose);
    return () => {
      window.removeEventListener('click', toggleClose);
    };
  }, []);

  return { toggleOpen, cardOpen };
};

export default useCardOpen;
