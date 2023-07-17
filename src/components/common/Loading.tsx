import React from 'react';
import Lottie from 'lottie-react';
import loading from 'lotties/loading.json';
import { styled } from 'styled-components';

const Loading = () => {
  return (
    <LoadingStyle>
      <Lottie animationData={loading} loop={true} className="lottiePlayer" />
    </LoadingStyle>
  );
};

export default Loading;

export const LoadingStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .lottiePlayer {
    width: 50px;
  }
`;
