import React from 'react';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

export default Layout;

export const LayoutStyle = styled.div`
  width: 1040px;
  margin: 0 auto;
`;
