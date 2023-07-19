import React, { useState } from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import useCardOpen from 'hooks/useCardOpen';
import SearchCard from './SearchCard';
import useLocalStorage from 'hooks/useLocalStorage';
import useSearchData from 'hooks/useSearchData';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const { handleAddKeyword, keywords } = useLocalStorage();
  const { toggleOpen, cardOpen } = useCardOpen();
  const { isLoading, searchData } = useSearchData({ searchValue });

  return (
    <SearchAreaStyle>
      <div onClick={toggleOpen}>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddKeyword={handleAddKeyword}
          isopen={cardOpen || searchValue}
        />
      </div>
      {(cardOpen || searchValue) && (
        <SearchCard
          searchValue={searchValue}
          searchData={searchData}
          keywords={keywords}
          isLoading={isLoading}
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
