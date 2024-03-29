import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul {
        list-style-type: none;
    }
    
    body {
        background-color: #fff;
        font-family: "Carrois Gothic SC", sans-serif;
    }
`;
