import { ISearch } from 'interface/search';
import React from 'react';
import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import COLORS from 'constant/colors';

interface Props {
  searchData: ISearch[];
}

const SearchCard = ({ searchData }: Props) => {
  return (
    <>
      {searchData.length > 0 && (
        <SearchCardListStyle>
          <ul>
            {searchData.map(result => (
              <li key={result.sickCd}>
                <BiSearch />
                <p>{result.sickNm}</p>
              </li>
            ))}
          </ul>
        </SearchCardListStyle>
      )}
    </>
  );
};

export default SearchCard;

const SearchCardListStyle = styled.div`
  margin-top: 10px;
  ul {
    li {
      padding: 10px 30px;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        background-color: ${COLORS.hoverlightGray};
        cursor: pointer;
      }
    }
  }
`;
