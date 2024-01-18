import React from "react";

import Styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";

const Header: React.FC<Props> = (props) => {
  const { handleBotChange }=props;
  return (
    <Styles className="Header">
     <div className="Header__logo">
      <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.udla.edu.ec/wp-content/uploads/2022/01/LOGOBLANCO2021.png"></img>
     </div>
     <select className="Header__selector" onChange={handleBotChange}>
    <option value="true">ChatBot</option>
    <option value="false">SpeakBot</option>
</select>
    </Styles>
  )
};

Header.defaultProps = {};

export default Header;
