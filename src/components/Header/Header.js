import React from "react";

import logo from "./images/logo.svg";

import "./Header.css";

const Header = ({ title }) => (
  <header className="header">
    <img src={logo} className="header-logo" alt="logo" />
    <h1 className="header-title">{title}</h1>
  </header>
);

export default Header;
