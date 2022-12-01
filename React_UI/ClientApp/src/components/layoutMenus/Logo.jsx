import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as KSLogo } from "../../assets/logos/ks-full.svg";

const Logo = () => {
  return (
    <Link to="/">
      <KSLogo style={{ height: 70, width: 210 }}/>
    </Link>
  );
};

export default Logo;
