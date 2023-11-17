import React from "react";

import Styles from "./Header.styles";
import { HeaderProps as Props } from "./Header.types";

const Header: React.FC<Props> = (props) => {
  return (
    <Styles className="Header">
     <div className="Header__logo">
      <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.udla.edu.ec/wp-content/uploads/2022/01/LOGOBLANCO2021.png"></img>
     </div>
    </Styles>
  )
};

Header.defaultProps = {};

export default Header;
