import React from 'react';
import Lottie from 'lottie-react';
import loading from 'lotties/loading.json';
import { styled } from 'styled-components';

const Loading = () => {
  return (
    <LoadingStyle>
      <Lottie animationData={loading} loop={true} style={{ width: '50px' }} />
    </LoadingStyle>
  );
};

export default Loading;

const LoadingStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
