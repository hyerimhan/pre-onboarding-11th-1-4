import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import URL from 'constant/url';
import COLORS from 'constant/colors';

const Nav = () => {
  return (
    <NavStyle>
      <li>
        <Link to="https://clinicaltrialskorea.com/about"></Link>
      </li>
      <li>
        <Link to={URL.about}>소개</Link>
      </li>
      <li>
        <Link to={URL.question}>질문과 답변</Link>
      </li>
      <li>
        <Link to={URL.news}>소식받기</Link>
      </li>
      <li>
        <Link to="">제휴/문의</Link>
      </li>
    </NavStyle>
  );
};

export default Nav;

const NavStyle = styled.ul`
  display: flex;
  gap: 25px;

  li {
    a {
      padding: 8px 16px;
      font-weight: bold;
      font-size: 16px;
      color: ${COLORS.navText};
    }
  }
`;
