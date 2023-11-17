import React from "react";

import Styles from "./Landing.styles";
import { LandingProps as Props } from "./Landing.types";

import Header from "../Header/Header";
import Chatbot from "../Chatbot/Chatbot";

const Landing: React.FC<Props> = (props) => {
  return (
    <Styles className="Landing">
      <header className="LandingHome__header">
        <Header/>
      </header>
      <main className="LandingHome__main">
        <Chatbot/>
      </main>
      <footer className="LandingHome__footer">
      </footer>
    </Styles>
  )
};

Landing.defaultProps = {};

export default Landing;
