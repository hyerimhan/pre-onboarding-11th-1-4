import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COLORS from 'constant/colors';
import COMMONSTYLES from 'constant/commonStyle';
import { ISearch } from 'interface/search';
import Loading from './common/Loading';
import SearchCardList from './SearchCardList';
import useSearchData from 'hooks/useSearchData';

interface Props {
  searchValue: string;
  keywords: ISearch[];
}

const SearchCard = ({ searchValue, keywords }: Props) => {
  const { isLoading, searchData } = useSearchData({ searchValue });

  return (
    <SearchCardStyle>
      {searchValue ? (
        <SearchPreviewStyle>
          <BiSearch />
          <PStyle>{searchValue}</PStyle>
        </SearchPreviewStyle>
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <H3Style>최근 검색어</H3Style>
          <SearchCardList searchData={keywords} />
        </>
      )}
      {searchData.length > 0 && searchValue ? (
        <>
          <H3Style style={{ marginTop: '30px' }}>추천 검색어</H3Style>
          <SearchCardList searchData={searchData} />
        </>
      ) : isLoading ? (
        <Loading />
      ) : null}
    </SearchCardStyle>
  );
};

export default SearchCard;

const SearchCardStyle = styled.div`
  width: 100%;
  background-color: ${COLORS.white};
  border-radius: 20px;
  position: absolute;
  top: 70px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.05);
  padding: 30px 0;
`;

const SearchPreviewStyle = styled.div`
  padding: 0 30px;
  display: flex;
  gap: 10px;

  > svg {
    color: ${COLORS.lightGray};
    font-size: 20px;
  }
`;

const PStyle = styled.p`
  width: 90%;
  font-weight: bold;
  ${COMMONSTYLES.textEliipsis}
`;

const H3Style = styled.h3`
  font-size: 12px;
  padding: 0 30px;
`;
