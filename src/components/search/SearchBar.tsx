/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  no-unused-vars */
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COLORS from 'constant/colors';

interface Props {
  searchValue: string;
  isopen: any;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onAddKeyword: (text: string) => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  onAddKeyword,
  isopen,
  onClick,
  onKeyDown,
  setCurrentIndex,
}: Props) => {
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddKeyword(searchValue);
    setSearchValue('');
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
    setCurrentIndex(-1);
  };

  return (
    <SearchBarStyle isopen={isopen.toString()} onClick={onClick}>
      <form onSubmit={formSubmit}>
        <InputStyle type="text" value={searchValue} onChange={handleInput} onKeyDown={onKeyDown} />
        <ButtonStyle>
          <BiSearch />
        </ButtonStyle>
      </form>
      {!isopen && (
        <PlaceHolderStyle>
          <BiSearch />
          <PStyle>질환명을 입력해주세요.</PStyle>
        </PlaceHolderStyle>
      )}
    </SearchBarStyle>
  );
};

export default SearchBar;

const SearchBarStyle = styled.div<{
  isopen: any;
}>`
  width: 100%;
  background-color: ${COLORS.white};
  border: 2px solid ${({ isopen }) => (isopen ? COLORS.blue : COLORS.white)};
  border-radius: 50px;
  position: relative;
`;

const InputStyle = styled.input<{
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}>`
  width: calc(100% - 56px);
  padding: 20px 10px 20px 24px;
  position: relative;
  z-index: 1;
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

const PlaceHolderStyle = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  cursor: pointer;

  > svg {
    color: ${COLORS.lightGray};
    font-size: 20px;
  }
`;

const PStyle = styled.p`
  color: ${COLORS.lightGray};
`;
