import React,{useState} from "react";

import Styles from "./Landing.styles";
import { LandingProps as Props } from "./Landing.types";

import Header from "../Header/Header";
import Chatbot from "../Chatbot/Chatbot";
import SpeakBot from "../SpeakBot/SpeakBot";

const Landing: React.FC<Props> = (props) => {
  const [isChatbot,setIsChatbot]=useState(true);
  const valueChangeHandler = () => { 
    setIsChatbot(!isChatbot)
  }
  return (
    <Styles className="Landing">
      <header className="LandingHome__header">
        <Header handleBotChange={valueChangeHandler}/>
      </header>
      <main className="LandingHome__main">
        {isChatbot ? <Chatbot/> :<SpeakBot/> }
      </main>
      <footer className="LandingHome__footer">
      </footer>
    </Styles>
  )
};

Landing.defaultProps = {};

export default Landing;
