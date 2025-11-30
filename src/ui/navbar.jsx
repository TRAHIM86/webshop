import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Link to="/main">Main</Link>
      <Link to="/">Shop</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
