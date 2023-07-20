import COLORS from 'constant/colors';
import { ISearch } from 'interface/search';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COMMONSTYLES from 'constant/commonStyle';

interface Props {
  searchData: ISearch[];
  focusIndex: number;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SearchCardItem = ({ searchData, focusIndex, onClick, setFocusIndex }: Props) => {
  return (
    <>
      {searchData.length > 0 ? (
        <SearchCardListStyle>
          {searchData
            .filter((v, i) => searchData.findIndex(prev => prev.sickNm === v.sickNm) === i)
            .map((result, index) => (
              <LiStyle
                key={result.sickCd}
                onClick={onClick}
                onMouseOver={() => setFocusIndex(-1)}
                isfocus={(focusIndex === index).toString()}
              >
                <BiSearch />
                <PStyle>{result.sickNm}</PStyle>
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
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isfocus: string;
}>`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ isfocus }) => (isfocus === 'true' ? COLORS.hoverlightGray : '')};

  &:hover,
  &:focus {
    background-color: ${COLORS.hoverlightGray};
    cursor: pointer;
  }

  > svg {
    color: ${COLORS.lightGray};
    font-size: 20px;
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
