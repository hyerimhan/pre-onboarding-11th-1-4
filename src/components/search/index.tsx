import React, { useState, useEffect } from 'react';
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
  const [searchData, setSearchData] = useState<ISearch[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleAddKeyword, keywords } = useLocalStorage();
  const { toggleOpen, cardOpen } = useCardOpen();
  const { currentIndex, ulRef, handleKeyPress, setCurrentIndex } = useKeyFocus(
    searchData.length,
    setSearchValue,
  );

  const debounce = useDebounce(searchValue);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await GETSEARCH(debounce.trim().toLowerCase());
        if (searchValue) setSearchData(response.slice(0, 7));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [debounce]);

  return (
    <SearchAreaStyle>
      <SearchBar
        searchValue={searchValue}
        isopen={cardOpen || searchValue}
        setSearchValue={setSearchValue}
        onAddKeyword={handleAddKeyword}
        onClick={toggleOpen}
        onKeyDown={handleKeyPress}
        setCurrentIndex={setCurrentIndex}
      />
      {(cardOpen || searchValue) && (
        <SearchCard
          searchData={searchData}
          keywords={keywords}
          searchValue={searchValue}
          isLoading={isLoading}
          ulRef={ulRef}
          currentIndex={currentIndex}
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
