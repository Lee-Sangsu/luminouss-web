import React from "react";
import { Link } from "react-router-dom";
import 'components/styles/GlobalNavigation.css'


const Navigation = ({ isLoggedIn }) => (
  <nav className="nav">
    <ul className="ul">
      <li className="luminouss">
        <Link to="/" className="link">
          <img src={require('images/titles/luminous.png').default} alt='루미너스' id='luminouss-img'/>
        </Link>
      </li>

      <li className="about">
        <Link to="/about-luminouss" className="link">
          About us
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