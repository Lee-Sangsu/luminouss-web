import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">루미너스</Link>
      </li>
      <li>
        <Link to="/about-luminouss">About</Link>
      </li>
      <li>
        <Link to="/my-profile">My Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;