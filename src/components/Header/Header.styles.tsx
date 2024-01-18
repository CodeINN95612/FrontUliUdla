import styled from "styled-components";

import { HeaderStyledProps as Props } from "./Header.types";

const HeaderStyled = styled.div<Props>`
display:flex;
background-color:red;
justify-content:space-between;
background-color:black;
position:fixed;
width:100%;
  .Header {
    &__logo{
      background-color: #8d002e;
    height: 108px;
    width: 226px;
    }
    &__selector{
      margin:20px;
      border-radius:20px;
      background-color: #8d002e;
      color:white;
      width:200px;
      align-items:center;
      text-align:center;
    }
  }
`;

export default HeaderStyled;
