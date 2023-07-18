import { useState, useEffect } from 'react';

const useStorage = () => {
  const [keywords, setKeywords] = useState(JSON.parse(localStorage.getItem('keywords') || '[]'));

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = (searchValue: string) => {
    const newKeyword = {
      sickCd: Date.now(),
      sickNm: searchValue,
    };
    setKeywords([...keywords, newKeyword]);
  };

  return { handleAddKeyword, keywords };
};

export default useStorage;
