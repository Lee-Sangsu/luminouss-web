import React from "react";
import { Link } from "react-router-dom";
import 'components/styles/GlobalNavigation.css'


const Navigation = ({ isLoggedIn }) => (
  <nav className="nav">
    <ul className="ul">
      <li className="luminouss">
        <Link to="/" className="link">
          루미너스
        </Link>
      </li>

      <li className="about">
        <Link to="/about-luminouss" className="link">
          About
        </Link>
      </li>

      {isLoggedIn ? (
        <li className="profile">
          <Link to="/my-profile" className="link">
            My Profile
          </Link>
        </li>
      ) : (
        <li className="login">
          <Link to="sign-in" className="link">
            로그인
          </Link>
        </li>
      )}
      
    </ul>
  </nav>
);
export default Navigation;