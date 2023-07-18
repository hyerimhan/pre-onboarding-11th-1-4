import React from 'react';
import { LayoutStyle } from './Layout';
import { styled } from 'styled-components';
import BannerPng1 from './svgs/BannerPng1';
import BannerPng2 from './svgs/BannerPng2';
import BannerPng3 from './svgs/BannerPng3';
import SearchBar from './SearchBar';

const Banner = () => {
  return (
    <Layout>
      <H2Style>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </H2Style>
      <BannerPng1 />
      <BannerPng2 />
      <BannerPng3 />
      <SearchBar />
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
