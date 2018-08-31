import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
    color: #fff;
    font-weight: 400;
    box-sizing: border-box;
    padding: 3rem;
    background: #AA076B;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #61045F, #AA076B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  h1, h2, h3, h4, h5 {
    font-weight: 300;
    margin-bottom: 1rem;
  }
`;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
