import React, { useState } from 'react';
import { LayoutStyle } from './Layout';
import { styled } from 'styled-components';
import BannerPng1 from './svgs/BannerPng1';
import BannerPng2 from './svgs/BannerPng2';
import BannerPng3 from './svgs/BannerPng3';
import SearchBar, { SearchBarStyle } from './SearchBar';
import SearchCard from './SearchCard';
import useStorage from 'hooks/useStorage';
import useCardOpen from 'hooks/useCardOpen';
// import COLORS from 'constant/colors';

const Banner = () => {
  const [searchValue, setSearchValue] = useState('');

  const { handleAddKeyword, keywords } = useStorage();
  const { toggleOpen, cardOpen } = useCardOpen();

  return (
    <Layout>
      <H2Style>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </H2Style>
      <SearchAreaStyle>
        <SearchBarWrapStyle onClick={toggleOpen}>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onAddKeyword={handleAddKeyword}
            isopen={cardOpen || searchValue}
          />
        </SearchBarWrapStyle>
        {(cardOpen || searchValue) && <SearchCard searchValue={searchValue} keywords={keywords} />}
      </SearchAreaStyle>
      <BannerPng1 />
      <BannerPng2 />
      <BannerPng3 />
    </Layout>
  );
};

export default Banner;

const Layout = styled(LayoutStyle)`
  padding: 80px 0 160px;
  position: relative;
`;

const H2Style = styled.h2`
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const SearchAreaStyle = styled.div`
  max-width: 490px;
  margin: 0 auto;
  position: relative;
`;

const SearchBarWrapStyle = styled.div`
  ${SearchBarStyle} {
  }
`;
