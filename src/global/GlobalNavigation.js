import React from "react";
import { Link } from "react-router-dom";
import 'components/styles/GlobalNavigation.css'
import {useRecoilValue} from 'recoil';
import IsLoggedInState from 'recoilStates/IsLoggedInState';


const Navigation = ({ isLoggedIn }) => {
  const loggedIn = useRecoilValue(IsLoggedInState);
  return (<nav id="nav">
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

      {isLoggedIn || loggedIn ? (
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
}
export default Navigation;