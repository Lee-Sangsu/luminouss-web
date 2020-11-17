import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">루미너스</Link>
      </li>
      <li>
        <Link to="/about-luminouss">About</Link>
      </li>
      {isLoggedIn ? (
        <li>
          <Link to="/my-profile">My Profile</Link>
        </li>
      ) : (
        <li>
          <Link to="sign-in">로그인</Link>
        </li>
      )}
      
    </ul>
  </nav>
);
export default Navigation;