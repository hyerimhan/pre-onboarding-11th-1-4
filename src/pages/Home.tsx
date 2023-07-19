import Banner from 'components/Banner';
import COLORS from 'constant/colors';
import React from 'react';
import { styled } from 'styled-components';

const Home = () => {
  return (
    <HomeStyle>
      <Banner />
    </HomeStyle>
  );
};

export default Home;

const HomeStyle = styled.section`
  background-color: ${COLORS.skyblue};
`;
