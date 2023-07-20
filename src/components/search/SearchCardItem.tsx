/* eslint-disable  @typescript-eslint/no-explicit-any */
import COLORS from 'constant/colors';
import { ISearch } from 'interface/search';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COMMONSTYLES from 'constant/commonStyle';

interface Props {
  searchData: ISearch[];
  ulRef?: React.RefObject<HTMLUListElement>;
  currentIndex?: number;
}

const SearchCardItem = ({ searchData, ulRef, currentIndex }: Props) => {
  return (
    <>
      {searchData.length > 0 ? (
        <SearchCardListStyle ref={ulRef}>
          {searchData
            .filter((v, i) => searchData.findIndex(prev => prev.sickNm === v.sickNm) === i)
            .map((result, index) => (
              <LiStyle key={result.sickCd} isfocus={(currentIndex === index).toString()}>
                <LinkTagStyle href="">
                  <BiSearch />
                  <PStyle>{result.sickNm}</PStyle>
                </LinkTagStyle>
              </LiStyle>
            ))}
        </SearchCardListStyle>
      ) : (
        <EmptyListStyle>검색어 없음</EmptyListStyle>
      )}
    </>
  );
};

export default SearchCardItem;

const SearchCardListStyle = styled.ul`
  margin-top: 10px;
`;

const LiStyle = styled.li<{
  isfocus: string;
}>`
  background-color: ${({ isfocus }) => (isfocus === 'true' ? COLORS.hoverlightGray : '')};
`;

const LinkTagStyle = styled.a`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  gap: 10px;

  > svg {
    color: ${COLORS.lightGray};
    font-size: 20px;
  }

  &:hover,
  &:focus {
    background-color: ${COLORS.hoverlightGray};
    cursor: pointer;
  }
`;

export const EmptyListStyle = styled.p`
  padding: 10px 30px 0;
  color: ${COLORS.lightGray};
`;

const PStyle = styled.p`
  width: 90%;
  ${COMMONSTYLES.textEllipsis}
`;

export const EmpthListStyle = styled.p`
  padding: 10px 30px 0;
  color: ${COLORS.lightGray};
`;
