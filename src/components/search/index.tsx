import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import useCardOpen from 'hooks/useCardOpen';
import SearchCard from './SearchCard';
import useLocalStorage from 'hooks/useLocalStorage';
import { ISearch } from 'interface/search';
import GETSEARCH from 'api';
import useDebounce from 'hooks/useDebounce';
import useKeyFocus from 'hooks/useKeyFocus';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<ISearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const wordBoxRef = useRef<HTMLDivElement>(null);
  const debounce = useDebounce(searchValue);

  const { handleAddKeyword, keywords } = useLocalStorage();
  const { toggleOpen, cardOpen } = useCardOpen();
  const { focusIndex, handleKeyDown, setFocusIndex } = useKeyFocus(
    searchData,
    isOnFocus,
    setIsOnFocus,
    setSearchValue,
  );

  const handleSearch = (text: string) => {
    if (!text) return;
    handleAddKeyword(text);

    setIsOnFocus(false);
    if (wordBoxRef.current) wordBoxRef.current.className = 'hidden';
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await GETSEARCH(debounce.trim().toLowerCase());
        setFocusIndex(-1);
        if (searchValue) setSearchData(response.slice(0, 7));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [debounce, setFocusIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <SearchAreaStyle>
      <div onClick={toggleOpen}>
        <SearchBar
          searchValue={searchValue}
          isopen={cardOpen || searchValue}
          setSearchValue={setSearchValue}
          onAddKeyword={handleSearch}
        />
      </div>
      {(cardOpen || searchValue) && (
        <SearchCard
          searchData={searchData}
          keywords={keywords}
          searchValue={searchValue}
          isLoading={isLoading}
          focusIndex={focusIndex}
          handleAddKeyword={handleSearch}
          setSearchValue={setSearchValue}
          setFocusIndex={setFocusIndex}
        />
      )}
    </SearchAreaStyle>
  );
};

export default Search;

const SearchAreaStyle = styled.div`
  max-width: 490px;
  margin: 0 auto;
  position: relative;
`;
