import COLORS from 'constant/colors';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  return (
    <SearchStyle>
      <input type="search" />
      <button>
        <BiSearch />
      </button>
    </SearchStyle>
  );
};

export default SearchBar;

const SearchStyle = styled.div`
  max-width: 490px;
  margin: 0 auto;
  background-color: ${COLORS.white};
  border-radius: 50px;
  position: relative;

  input {
    padding: 20px 10px 20px 24px;
    font-size: 1.125rem;
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
