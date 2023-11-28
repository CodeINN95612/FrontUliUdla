import styled from "styled-components";

import { ChatbotStyledProps as Props } from "./Chatbot.types";

const ChatbotStyled = styled.div<Props>`
  width:100%;
  height:100%;
  margin-top:120px;
 z-index:-1;
display:flex;
flex-direction:column;
  .Chatbot {
    &__body{
      width:100%;
      padding:26px;
      flex: 1;
      display: flex;
      flex-direction: column;
 overflow-y:scroll;
    }

    &__input{
      width:94%;
      border-radius:20px;
    }

     &__inputContainer{
width:100%;
display:flex;
position:fixed;
align-items:center;
justify-content:center;
      bottom:0;
     }

    &__user{
      text-align:left;
      max-width:200px;
    background-color: #ffb7b7;
    border: 2px solid #ff9d9d;
    border-radius: 32px 64px 32px 64px;
margin-bottom:16px;
    padding: 20px;
    text-align: center;
    }
    &__chatbot{
      text-align:right;
      background-color: #ffb7b7;
    border: 2px solid #ff9d9d;
    border-radius: 32px 64px 32px 64px;
margin-bottom:16px;
max-width:500px;
    padding: 20px;
    align-self: flex-end;
    }
  }
`;

export default ChatbotStyled;
