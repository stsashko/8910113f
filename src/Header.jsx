import React from "react";
import icons from "./assets/images/icons.svg";

const Header = () => {
  return (
    <header>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${icons}#logo`} />
      </svg>
    </header>
  );
};

export default Header;
