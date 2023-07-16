import React from 'react';
import { LayoutStyle } from './Layout';
import { styled } from 'styled-components';
import Banner1 from './svgs/Banner1';
import Banner2 from './svgs/Banner2';
import Banner3 from './svgs/Banner3';
import SearchBar from './SearchBar';

const Banner = () => {
  return (
    <Layout>
      <h2>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>
      <Banner1 />
      <Banner2 />
      <Banner3 />
      <SearchBar />
    </Layout>
  );
};

export default Banner;

const Layout = styled(LayoutStyle)`
  padding: 80px 0 160px;
  position: relative;

  h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  > svg {
    position: absolute;
    width: 140px;

    &:nth-of-type(1) {
      top: 200px;
    }

    &:nth-of-type(2) {
      right: 20px;
      top: 188px;
    }

    &:nth-of-type(3) {
      right: 124px;
      top: 280px;
    }
  }
`;
