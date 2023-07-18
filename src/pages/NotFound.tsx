import Notfound from 'components/svgs/Notfound';
import React from 'react';
import { styled } from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundStyle>
      <Notfound />
    </NotFoundStyle>
  );
};

export default NotFound;

const NotFoundStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
