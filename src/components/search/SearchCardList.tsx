import COLORS from 'constant/colors';
import { ISearch } from 'interface/search';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COMMONSTYLES from 'constant/commonStyle';

interface Props {
  searchData: ISearch[];
}

const SearchCardList = ({ searchData }: Props) => {
  return (
    <>
      {searchData.length > 0 ? (
        <SearchCardListStyle>
          {searchData
            .filter((v, i) => searchData.findIndex(prev => prev.sickNm === v.sickNm) === i)
            .map(result => (
              <LiStyle key={result.sickCd}>
                <BiSearch />
                <PStyle>{result.sickNm}</PStyle>
              </LiStyle>
            ))}
        </SearchCardListStyle>
      ) : (
        <EmpthListStyle>검색어 없음</EmpthListStyle>
      )}
    </>
  );
};

export default SearchCardList;

const SearchCardListStyle = styled.ul`
  margin-top: 10px;
`;

const LiStyle = styled.li`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${COLORS.hoverlightGray};
    cursor: pointer;
  }

  > svg {
    color: ${COLORS.lightGray};
    font-size: 20px;
  }
`;

const PStyle = styled.p`
  width: 90%;
  ${COMMONSTYLES.textEllipsis}
`;

export const EmpthListStyle = styled.p`
  padding: 10px 30px 0;
  color: ${COLORS.lightGray};
`;
