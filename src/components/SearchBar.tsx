/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COLORS from 'constant/colors';

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onAddKeyword: any;
  isopen: any;
}

const SearchBar = ({ searchValue, setSearchValue, onAddKeyword, isopen }: Props) => {
  const searchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const targetValue = e.target.value;
    setSearchValue(targetValue);
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddKeyword(searchValue);
    // setSearchValue('');
  };

  return (
    <SearchBarStyle isopen={isopen.toString()}>
      <form onSubmit={formSubmit}>
        <InputStyle type="text" value={searchValue} onChange={searchValueChange} />
        <ButtonStyle>
          <BiSearch />
        </ButtonStyle>
      </form>
    </SearchBarStyle>
  );
};

export default SearchBar;

export const SearchBarStyle = styled.div<{
  isopen: any;
}>`
  width: 100%;
  background-color: ${COLORS.white};
  border: 2px solid ${({ isopen }) => (isopen ? COLORS.blue : COLORS.white)};
  border-radius: 50px;
  position: relative;
`;

const InputStyle = styled.input`
  width: calc(100% - 56px);
  padding: 20px 10px 20px 24px;
`;

const ButtonStyle = styled.button`
  width: 48px;
  height: 48px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;

  > svg {
    font-size: 25px;
  }
`;
