import COLORS from 'constant/colors';
import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { GETSEARCH } from 'api';
import Loading from './common/Loading';
import SearchCard from './SearchCard';
import { ISearch } from 'interface/search';

const SearchBar = () => {
  const [searchData, setSearchData] = useState<ISearch[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GETSEARCH(searchValue);
      console.log(response.data);
      setSearchData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchFormSubmit = () => {
    getSearch();
  };

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setSearchValue(targetValue);
  };

  return (
    <SearchStyle>
      <SearchBarStyle>
        <form onSubmit={searchFormSubmit}>
          <input type="text" onChange={searchInputChange} />
          <button>
            <BiSearch />
          </button>
        </form>
      </SearchBarStyle>
      <SearchCardStyle>
        <SearchCard searchData={searchData} />
        {isLoading && <Loading />}
      </SearchCardStyle>
    </SearchStyle>
  );
};

export default SearchBar;

const SearchStyle = styled.div`
  position: relative;
  max-width: 490px;
  margin: 0 auto;
`;

const SearchBarStyle = styled.div`
  background-color: ${COLORS.white};
  border-radius: 50px;
  position: relative;
  padding: 20px 10px 20px 24px;
  font-size: 1.125rem;

  input {
    width: calc(100% - 52px);
  }

  button {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background-color: ${COLORS.blue};
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLORS.white};
    font-size: 25px;

    svg {
      width: auto;
    }
  }
`;

const SearchCardStyle = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  position: absolute;
  right: 0;
  top: 70px;
  border-radius: 20px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  padding: 30px 0;
`;
