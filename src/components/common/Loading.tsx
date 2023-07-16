import React from 'react';
import Lottie from 'lottie-react';
import loading from 'lotties/loading.json';
import { styled } from 'styled-components';

const Loading = () => {
  return (
    <LottieStyle>
      <Lottie animationData={loading} loop={true} />
    </LottieStyle>
  );
};

export default Loading;

const LottieStyle = styled.div`
  width: 50px;
`;
