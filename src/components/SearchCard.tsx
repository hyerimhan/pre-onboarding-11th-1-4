import COLORS from 'constant/colors';
import { ISearch } from 'interface/search';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';

interface Props {
  searchData: ISearch[];
}

const SearchCard = ({ searchData }: Props) => {
  return (
    <LatestSearchStyle>
      <h3>최근 검색어</h3>
      <ul>
        {searchData.length > 0 ? (
          searchData.map(result => (
            <li key={result.sickCd}>
              <BiSearch />
              {result.sickNm}
            </li>
          ))
        ) : (
          <p>최근 검색어가 없습니다.</p>
        )}
      </ul>
    </LatestSearchStyle>
  );
};

export default SearchCard;

const LatestSearchStyle = styled.div`
  h3 {
    color: ${COLORS.darkGray};
    font-size: 12px;
    margin-bottom: 15px;
    padding: 0 30px;
  }

  ul {
    li {
      padding: 10px 30px;
      svg {
        color: ${COLORS.lightGray};
      }
    }
    p {
      color: ${COLORS.lightGray};
      font-weight: bold;
      padding: 5px 30px;
    }
  }
`;
