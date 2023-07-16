import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
  }

  ul,li {
    list-style: none;
  }

  button, input {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    font: inherit;
  }

  input:not([type="checkbox"]) {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color:inherit;
  }
`;

export default GlobalStyle;
